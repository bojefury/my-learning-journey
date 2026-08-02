"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { deleteUploadedImage, uploadImage } from "@/lib/image-storage";
import { requirePermission } from "@/lib/rbac";

export type UploadState = { error?: string; success?: string };
const idSchema = z.string().cuid();
const bannerHrefSchema = z
  .string()
  .trim()
  .max(500)
  .refine(
    (value) => !value || (value.startsWith("/") && !value.startsWith("//")),
  );

function imageFrom(data: FormData) {
  const image = data.get("image");
  if (!(image instanceof File)) throw new Error("IMAGE_REQUIRED");
  return image;
}

function message(error: unknown) {
  if (error instanceof Error && error.message === "UNSUPPORTED_IMAGE_TYPE")
    return "Разрешены JPG, PNG, WebP, AVIF и GIF.";
  if (error instanceof Error && error.message === "INVALID_IMAGE_SIZE")
    return "Размер изображения должен быть от 1 байта до 8 МБ.";
  if (error instanceof Error && error.message === "IMAGE_REQUIRED")
    return "Выберите изображение.";
  if (error instanceof Error && error.message === "BLOB_STORAGE_NOT_CONFIGURED")
    return "Облачное хранилище не настроено.";
  return "Не удалось сохранить изображение. Повторите попытку.";
}

export async function uploadLogo(
  _state: UploadState,
  data: FormData,
): Promise<UploadState> {
  const actor = await requirePermission("catalog");
  let url: string | undefined;
  try {
    const previous = await prisma.storeSettings.findUnique({
      where: { id: "store" },
    });
    const uploadedUrl = await uploadImage(imageFrom(data), "logos");
    url = uploadedUrl;
    await prisma.$transaction([
      prisma.storeSettings.upsert({
        where: { id: "store" },
        create: { id: "store", logoUrl: uploadedUrl },
        update: { logoUrl: uploadedUrl },
      }),
      prisma.adminAuditLog.create({
        data: {
          actorId: actor.id,
          action: "LOGO_UPDATED",
          entityType: "StoreSettings",
          entityId: "store",
          metadata: { url: uploadedUrl },
        },
      }),
    ]);
    if (previous?.logoUrl)
      await deleteUploadedImage(previous.logoUrl).catch(console.error);
    revalidatePath("/", "layout");
    return { success: "Логотип обновлён." };
  } catch (error) {
    if (url) await deleteUploadedImage(url).catch(console.error);
    return { error: message(error) };
  }
}

export async function uploadBanner(
  _state: UploadState,
  data: FormData,
): Promise<UploadState> {
  const actor = await requirePermission("catalog");
  const parsed = z
    .object({
      title: z.string().trim().min(1).max(120),
      href: bannerHrefSchema,
    })
    .safeParse({ title: data.get("title"), href: data.get("href") });
  if (!parsed.success)
    return { error: "Укажите название и корректную ссылку баннера." };
  let url: string | undefined;
  try {
    const uploadedUrl = await uploadImage(imageFrom(data), "banners");
    url = uploadedUrl;
    await prisma.$transaction(async (tx) => {
      const banner = await tx.banner.create({
        data: {
          title: parsed.data.title,
          href: parsed.data.href || null,
          imageUrl: uploadedUrl,
          active: true,
        },
      });
      await tx.adminAuditLog.create({
        data: {
          actorId: actor.id,
          action: "BANNER_CREATED",
          entityType: "Banner",
          entityId: banner.id,
          metadata: { url: uploadedUrl },
        },
      });
    });
    revalidatePath("/admin/media");
    return { success: "Баннер загружен." };
  } catch (error) {
    if (url) await deleteUploadedImage(url).catch(console.error);
    return { error: message(error) };
  }
}

export async function uploadProductImage(
  _state: UploadState,
  data: FormData,
): Promise<UploadState> {
  const actor = await requirePermission("catalog");
  const parsed = z
    .object({ productId: idSchema, alt: z.string().trim().min(1).max(160) })
    .safeParse({ productId: data.get("productId"), alt: data.get("alt") });
  if (!parsed.success)
    return { error: "Выберите товар и заполните альтернативный текст." };
  let url: string | undefined;
  try {
    const uploadedUrl = await uploadImage(imageFrom(data), "products");
    url = uploadedUrl;
    await prisma.$transaction(async (tx) => {
      const last = await tx.productImage.aggregate({
        where: { productId: parsed.data.productId },
        _max: { position: true },
      });
      const image = await tx.productImage.create({
        data: {
          productId: parsed.data.productId,
          url: uploadedUrl,
          alt: parsed.data.alt,
          position: (last._max.position ?? -1) + 1,
        },
      });
      await tx.adminAuditLog.create({
        data: {
          actorId: actor.id,
          action: "PRODUCT_IMAGE_CREATED",
          entityType: "ProductImage",
          entityId: image.id,
          metadata: { url: uploadedUrl, productId: parsed.data.productId },
        },
      });
    });
    revalidatePath("/admin/media");
    return { success: "Изображение товара загружено." };
  } catch (error) {
    if (url) await deleteUploadedImage(url).catch(console.error);
    return { error: message(error) };
  }
}
