import { asyncHandler } from "@/lib/api-utils";
import { v2 as cloudinary } from "cloudinary";
import { successResponse } from "@/lib/api-utils";
import { NextResponse } from "next/server";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = asyncHandler(async (req) => {
  const formData = await req.formData();
  const file = formData.get("file") as Blob;
    if (!file) {
        return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ success: false, error: "Invalid file type" }, { status: 400 });
  }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ success: false, error: "File too large (max 5MB)" }, { status: 400 });
    }
    // Convert Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream(
        {
            folder: formData.get("folder")?.toString() || "uploads",
            resource_type: "image",
        },
        (error, result) => {
            if (error || !result) {
                return NextResponse.json({ success: false, error: error?.message || "Upload failed" }, { status: 500 });
            }
            return NextResponse.json({ success: true, url: result.secure_url });
        }
    );

    // Write buffer to upload stream
    uploadResult.end(buffer);
});

// Return 405 for other methods
export const GET = () => NextResponse.json({ success: false, error: "Method Not Allowed" }, { status: 405 });
export const PUT = () => NextResponse.json({ success: false, error: "Method Not Allowed" }, { status: 405 });