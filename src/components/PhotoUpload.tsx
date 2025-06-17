import React, { useState, useRef } from "react";
import { Upload, X, Loader } from "lucide-react";
import { Photo } from "../types/Photo";
import { uploadPhotos } from "../services/cloudinaryService";

interface PhotoUploadProps {
  onPhotosUploaded: (photos: Photo[]) => void;
  showSuccess: (title: string, message?: string, duration?: number) => string;
  showError: (title: string, message?: string, duration?: number) => string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotosUploaded,
  showSuccess,
  showError,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploaderName, setUploaderName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !uploaderName.trim()) {
      showError(
        "Missing information",
        "Please add your name and select at least one photo"
      );
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress (since we can't get real progress from Promise.all)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const uploadedPhotos = await uploadPhotos(
        selectedFiles,
        uploaderName.trim()
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Pass the uploaded photos to parent component
      onPhotosUploaded(uploadedPhotos);

      // Reset form
      setSelectedFiles([]);
      setUploaderName("");
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      showSuccess(
        "Upload successful!",
        `Successfully uploaded ${uploadedPhotos.length} photo${
          uploadedPhotos.length !== 1 ? "s" : ""
        } to Cloudinary`
      );
    } catch (error) {
      console.error("Upload error:", error);
      showError(
        "Upload failed",
        error instanceof Error
          ? error.message
          : "Failed to upload photos. Please try again."
      );
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Share Your Wedding Photos
      </h2>

      <div className="mb-4">
        <label
          htmlFor="uploaderName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Name *
        </label>
        <input
          id="uploaderName"
          type="text"
          value={uploaderName}
          onChange={(e) => setUploaderName(e.target.value)}
          placeholder="Enter your name"
          disabled={isUploading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100"
        />
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragOver
            ? "border-pink-500 bg-pink-50"
            : "border-gray-300 hover:border-pink-400 hover:bg-pink-50"
        } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">
          Drag and drop your photos here, or click to select
        </p>
        <p className="text-sm text-gray-500">Supports JPG, PNG, GIF files</p>
        <p className="text-xs text-gray-400 mt-2">
          Photos will be uploaded to Cloudinary with your name as metadata
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Selected Photos ({selectedFiles.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                {!isUploading && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isUploading && (
        <div className="mt-6">
          <div className="flex items-center justify-center mb-2">
            <Loader className="animate-spin h-5 w-5 text-pink-600 mr-2" />
            <span className="text-gray-600">Uploading to Cloudinary...</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1 text-center">
            {uploadProgress}% complete
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={
          selectedFiles.length === 0 || !uploaderName.trim() || isUploading
        }
        className="w-full mt-6 bg-pink-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {isUploading ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-2" />
            Uploading...
          </>
        ) : (
          <>
            Upload {selectedFiles.length} Photo
            {selectedFiles.length !== 1 ? "s" : ""} to Cloudinary
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        * Your name will be stored as metadata with each photo for attribution
      </p>
    </div>
  );
};
