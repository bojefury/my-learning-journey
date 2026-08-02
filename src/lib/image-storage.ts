import { del, put } from "@vercel/blob";

const acceptedTypes = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const maximumBytes = 8 * 1024 * 1024;

function safeName(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .slice(-100) || "image"
  );
}

export async function uploadImage(
  file: File,
  folder: "logos" | "banners" | "products",
) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_STORAGE_NOT_CONFIGURED");
  if (!acceptedTypes.has(file.type)) throw new Error("UNSUPPORTED_IMAGE_TYPE");
  if (!file.size || file.size > maximumBytes)
    throw new Error("INVALID_IMAGE_SIZE");
  const blob = await put(
    `${folder}/${crypto.randomUUID()}-${safeName(file.name)}`,
    file,
    {
      access: "public",
      addRandomSuffix: false,
      token,
    },
  );
  return blob.url;
}

export async function deleteUploadedImage(url: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_STORAGE_NOT_CONFIGURED");
  await del(url, { token });
}
