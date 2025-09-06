// types/prediction.ts
export interface PredictionResult {
  class: string;
  confidence: number;
}

export interface PredictionData {
  _id: string;
  user: string;
  imageUrl: string;
  predict_c: PredictionResult;
  predict_d: PredictionResult;
  final_prediction: PredictionResult;
  secondary_prediction: PredictionResult;
  createdAt: string;
  updatedAt: string;
}