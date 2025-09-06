// models/Prediction.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPrediction extends Document {
  user: Types.ObjectId;   // Reference to User
  imageUrl: string;
  predict_c: {
    class: string;
    confidence: number;
  };
  predict_d: {
    class: string;
    confidence: number;
  };
  final_prediction: {
    class: string;
    confidence: number;
  };
  secondary_prediction: {
    class: string;
    confidence: number;
  };
  createdAt: Date;
}

const PredictionSchema: Schema<IPrediction> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    predict_c: {
      class: { type: String, required: true },
      confidence: { type: Number, required: true }
    },
    predict_d: {
      class: { type: String, required: true },
      confidence: { type: Number, required: true }
    },
    final_prediction: {
      class: { type: String, required: true },
      confidence: { type: Number, required: true }
    },
    secondary_prediction: {
      class: { type: String, required: true },
      confidence: { type: Number, required: true }
    }
  },
  { timestamps: true }
);

export default mongoose.models.Prediction ||
  mongoose.model<IPrediction>("Prediction", PredictionSchema);
