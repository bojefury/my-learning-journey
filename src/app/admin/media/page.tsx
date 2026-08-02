import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { UploadForm } from "./upload-form";
import { uploadBanner, uploadLogo, uploadProductImage } from "./actions";

export const dynamic = "force-dynamic";

interface ProductOption {
  id: string;
  name: string;
}

interface BannerPreview {
  id: string;
  title: string;
  imageUrl: string | null;
}

interface StoreSettingsView {
  logoUrl: string | null;
}

export default async function MediaPage() {
  const [products, banners, settings]: [
    ProductOption[],
    BannerPreview[],
    StoreSettingsView | null,
  ] = await Promise.all([
    prisma.product.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.banner.findMany({
      where: { imageUrl: { not: null } },
      orderBy: { position: "asc" },
    }),
    prisma.storeSettings.findUnique({ where: { id: "store" } }),
  ]);
  return (
    <div className="container section stack">
      <Link href="/admin">← Dashboard</Link>
      <div className="page-hero">
        <div className="eyebrow">Облачное хранилище</div>
        <h1>Изображения</h1>
        <p>
          Файлы загружаются в Vercel Blob, а публичные URL сохраняются в
          PostgreSQL.
        </p>
      </div>
      <div className="feature-grid">
        <UploadForm action={uploadLogo} label="Логотип">
          {settings?.logoUrl && (
            <Image
              src={settings.logoUrl}
              alt="Текущий логотип"
              width={96}
              height={96}
            />
          )}
        </UploadForm>
        <UploadForm action={uploadBanner} label="Новый баннер">
          <label>
            Название
            <input className="field" name="title" maxLength={120} required />
          </label>
          <label>
            Ссылка
            <input
              className="field"
              name="href"
              maxLength={500}
              placeholder="/sale"
            />
          </label>
        </UploadForm>
        <UploadForm action={uploadProductImage} label="Изображение товара">
          <label>
            Товар
            <select className="field" name="productId" required>
              <option value="">Выберите товар</option>
              {products.map((product: ProductOption) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Альтернативный текст
            <input className="field" name="alt" maxLength={160} required />
          </label>
        </UploadForm>
      </div>
      {banners.length > 0 && (
        <section>
          <h2>Баннеры</h2>
          <div className="product-grid">
            {banners.map((banner: BannerPreview) => (
              <article className="panel" key={banner.id}>
                <Image
                  src={banner.imageUrl!}
                  alt={banner.title}
                  width={640}
                  height={320}
                  style={{ width: "100%", height: "auto" }}
                />
                <b>{banner.title}</b>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
