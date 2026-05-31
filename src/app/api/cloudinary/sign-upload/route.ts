import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_PRODUCT_FOLDER ?? "afterhours/products";

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { message: "Cloudinary environment variables are missing" },
      { status: 500 }
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    apiSecret
  );

  return NextResponse.json({
    timestamp,
    signature,
    apiKey,
    cloudName,
    folder,
  });
}