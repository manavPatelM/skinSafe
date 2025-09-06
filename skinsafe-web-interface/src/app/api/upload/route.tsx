import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { successResponse, errorResponse, asyncHandler } from "@/lib/api-utils";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = asyncHandler(async (req) => {
  await dbConnect();

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const userId = formData.get("userId") as string | null;

  if (!file) {
    return errorResponse("No file uploaded", 400);
  }
  if (!userId) {
    return errorResponse("User ID is missing in formData", 400);
  }

  // validate user exists
  const user = await User.findById(userId);
  if (!user) {
    return errorResponse("User not found", 404);
  }

  // Convert File to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload to Cloudinary
  const uploadResult = await new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });

  // Save uploaded image URL to user's account
  try {
    // Add the image URL to a 'uploads' array (create if not exists)
    const userUpdate = await User.findByIdAndUpdate(userId, {
      $push: { uploads: uploadResult.secure_url },
    }, { upsert: false });

    

    console.log("Image URL saved to user account", userUpdate);
  } catch (err) {
    console.warn("Could not save image URL to user account", err);
  }

  return successResponse({
    url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
    user: user._id,
  });
});
