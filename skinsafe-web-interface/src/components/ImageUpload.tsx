"use client";

import React, { useState, useRef } from "react";
import axios from "axios";

interface ImageUploadProps {
  onImageUploaded?: (url: string) => void;
  defaultImage?: string;
  label?: string;
  className?: string;
  folder?: string; // Folder in Cloudinary to upload images to
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  defaultImage = "",
  folder = "uploads",
  label = "Upload Image",
  className = "",
}) => {
  const [image, setImage] = useState<string>(defaultImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("❌ Only JPEG, PNG, or WebP images allowed.");
      return;
    }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("❌ File too large (max 5MB).");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.data.success) throw new Error(res.data.error || "Upload failed");

      setImage(res.data.url);
      if (onImageUploaded) onImageUploaded(res.data.url);

      alert("✅ Image uploaded successfully!");
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("❌ Upload failed: " + (err.message || "Unknown error"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setImage("");
    if (onImageUploaded) onImageUploaded("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`w-full ${className}`}>
      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <div className="mt-2">
        {image ? (
          <div className="relative w-full h-48 rounded-md overflow-hidden border">
            <img src={image} alt="Uploaded preview" className="object-cover w-full h-full" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
            >
              ✕ Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 relative"
          >
            {isUploading ? (
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, WebP (max 5MB)</p>
              </div>
            )}
          </label>
        )}

        <input
          id="file-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
