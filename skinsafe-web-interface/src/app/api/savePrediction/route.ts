import Prediction from "@/models/Prediction";
import User from "@/models/User";
import { successResponse, errorResponse, asyncHandler } from "@/lib/api-utils";
import dbConnect from "@/lib/mongoose";

export const POST = asyncHandler(async (req) => {
  await dbConnect();
  const body = await req.json();
  console.log("Request body:", body);
  const { userId } = body;
  if (!userId) {
    return errorResponse("userId is required", 400);
  }

  // Get user and latest uploaded image URL
  const user = await User.findById(userId);
  console.log("User found:", user);
  if (!user) {
    return errorResponse("User not found", 404);
  }
  const uploads = user.uploads || [];
  const imageUrl = uploads.length > 0 ? uploads[uploads.length - 1] : null;
  if (!imageUrl) {
    return errorResponse("No uploaded image found for user", 404);
  }

  try {
    // Call FastAPI backend with image_url
    const res = await fetch(`${process.env.FASTAPI_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl }),
    });
    const data = await res.json();
    if (!res.ok) {
      return errorResponse("FastAPI error", res.status, data.detail || data);
    }
    // convert data.predict_c and data.predict_d and data.final_prediction and data.secondary_prediction to JSON
    const jsonData = {
      image_url: data.image_url,
      predict_c: data.predict_c,
      predict_d: data.predict_d,
      final_prediction: data.final_prediction,
      secondary_prediction: data.secondary_prediction,
    };

    // Save prediction in MongoDB
    try {
      await Prediction.create({
        user: userId,
        imageUrl: data.image_url,
        predict_c: data.predict_c,
        predict_d: data.predict_d,
        final_prediction: data.final_prediction,
        secondary_prediction: data.secondary_prediction,
      });
      console.log("FastAPI response:", data);
    } catch (dbErr) {
      console.error("Error saving prediction to DB", dbErr);
    }

    return successResponse(data);
  } catch (err: any) {
    return errorResponse("Prediction API call failed", 500, err.message);
  }
});
