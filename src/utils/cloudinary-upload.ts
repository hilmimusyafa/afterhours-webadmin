export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadProductImage(
  file: File
): Promise<CloudinaryUploadResult> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be smaller than 5MB");
  }

  const signResponse = await fetch("/api/cloudinary/sign-upload", {
    method: "POST",
  });

  const signPayload = await signResponse.json();

  if (!signResponse.ok) {
    throw new Error(signPayload.message || "Failed to prepare upload");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signPayload.apiKey);
  formData.append("timestamp", String(signPayload.timestamp));
  formData.append("signature", signPayload.signature);
  formData.append("folder", signPayload.folder);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${signPayload.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const uploadPayload = await uploadResponse.json();

  if (!uploadResponse.ok) {
    throw new Error(uploadPayload.error?.message || "Image upload failed");
  }

  return uploadPayload as CloudinaryUploadResult;
}