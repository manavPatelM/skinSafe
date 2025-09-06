"use client";

import { useSession } from "next-auth/react";
import {
  Upload,
  Camera,
  CheckCircle,
  X,
  Heart,
  ChevronRight,
  RefreshCw,
  Download,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UploadPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [prediction, setPrediction] = useState<any>(null);
  const [currentView, setCurrentView] = useState<"upload" | "history">("upload");
  const [history, setHistory] = useState<string[]>([]);

  // Reset upload
  const resetUpload = () => {
    setSelectedImage(null);
    setPrediction(null);
    setUploadMessage("");
    setIsUploading(false);
    setIsAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Dummy recommendations
  const getHealthRecommendations = (prediction: any): string[] => {
    if (!prediction?.data) return ["No recommendation available"];
    return [
      "Keep skin hydrated",
      "Use sunscreen regularly",
      "Consult a dermatologist if condition worsens",
    ];
  };

  // ✅ Upload image and trigger analysis
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("❌ Only JPEG, PNG, or WebP images allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("❌ File too large (max 5MB).");
      return;
    }

    // Reset previous state
    setPrediction(null);
    setUploadMessage("");

    // ✅ Local preview
    const localPreview = URL.createObjectURL(file);
    setSelectedImage(localPreview);

    // Start upload process
    setIsUploading(true);
    setUploadMessage("Uploading image...");

    try {
      // Step 1: Upload image
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", session?.user?.id || "guest");

      const uploadResponse = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadData = uploadResponse.data;

      if (uploadData?.data?.url) {
        // Update with server URL (replace local preview)
        setSelectedImage(uploadData.data.url);
        setUploadMessage("✅ Image uploaded successfully!");
        setIsUploading(false);
        
        // Step 2: Start analysis
        setIsAnalyzing(true);
        setUploadMessage("Analyzing image...");

        const predictionResponse = await axios.post("/api/savePrediction", {
          userId: session?.user?.id || "guest",
        });

        const predictionData = predictionResponse.data;

        if (predictionData) {
          setPrediction(predictionData);
          setUploadMessage("✅ Analysis complete!");
          // Add to history
          setHistory((prev) => [uploadData.data.url, ...prev]);
        } else {
          setUploadMessage("❌ Analysis failed. Please try again.");
        }
      } else {
        throw new Error("Upload failed - no URL returned");
      }
    } catch (err: any) {
      console.error("Upload/Analysis error:", err);
      setUploadMessage("❌ Process failed: " + (err.message || "Unknown error"));
      // Keep local preview on error
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") {
    // router.push("/login");
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
      {currentView === "upload" && (
        <>
          {!selectedImage ? (
            /* UPLOAD SECTION */
            <div className="text-center">
              <label htmlFor="file-upload" className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                  <Upload className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Upload Your Photo
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Drag and drop your image here, or click to browse
                  </p>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl inline-flex items-center space-x-2 font-medium hover:shadow-lg transition-all">
                    <Camera className="w-5 h-5" />
                    <span>Choose Photo</span>
                  </div>
                </div>
              </label>
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading || isAnalyzing}
              />

              {/* Upload status */}
              {uploadMessage && (
                <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {uploadMessage}
                </p>
              )}
            </div>
          ) : (
            /* IMAGE PREVIEW & RESULTS SECTION */
            <div className="space-y-8">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="w-80 h-80 object-cover rounded-2xl shadow-lg"
                  />
                  {!isUploading && !isAnalyzing && (
                    <button
                      onClick={resetUpload}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Loading States */}
              {(isUploading || isAnalyzing) && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isUploading ? "Uploading..." : "Analyzing Your Skin..."}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isUploading ? "Saving your image" : "Our AI is processing your image"}
                  </p>
                </div>
              )}

              {/* Status Message */}
              {uploadMessage && (
                <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  {uploadMessage}
                </p>
              )}

              {/* PREDICTION RESULTS - NOW PROPERLY POSITIONED */}
              {prediction?.data && !isUploading && !isAnalyzing && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Analysis Results
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Primary */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                      <h4 className="font-semibold mb-4">Primary Analysis</h4>
                      <p className="text-lg font-semibold">
                        {prediction.data.final_prediction?.class ?? "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Confidence:{" "}
                        {prediction.data.final_prediction
                          ? (prediction.data.final_prediction.confidence * 100).toFixed(1)
                          : 0}
                        %
                      </p>
                    </div>

                    {/* Secondary */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                      <h4 className="font-semibold mb-4">Secondary Analysis</h4>
                      <p className="text-lg font-semibold">
                        {prediction.data.secondary_prediction?.class ?? "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Confidence:{" "}
                        {prediction.data.secondary_prediction
                          ? (prediction.data.secondary_prediction.confidence * 100).toFixed(1)
                          : 0}
                        %
                      </p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="mb-8">
                    <h4 className="font-semibold flex items-center mb-4">
                      <Heart className="w-5 h-5 text-red-500 mr-2" /> Health Recommendations
                    </h4>
                    <ul className="space-y-3">
                      {getHealthRecommendations(prediction).map((rec, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={resetUpload}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors"
                    >
                      <RefreshCw className="w-5 h-5 inline-block mr-2" />
                      Scan Another
                    </button>
                    <button
                      onClick={() => setCurrentView("history")}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transition-all"
                    >
                      <Download className="w-5 h-5 inline-block mr-2" />
                      Save & View History
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* History */}
      {currentView === "history" && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Upload History
          </h2>
          {history.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No uploads yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {history.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`history-${idx}`}
                  className="w-full h-40 object-cover rounded-xl shadow-md"
                />
              ))}
            </div>
          )}
          <button
            onClick={() => setCurrentView("upload")}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            ⬅ Back to Upload
          </button>
        </div>
      )}
    </div>
  );
}