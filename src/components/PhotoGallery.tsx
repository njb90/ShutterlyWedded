import React, { useState } from "react";
import { Calendar, User, Image as ImageIcon, FileText } from "lucide-react";
import { Photo } from "../types/Photo";
import { getThumbnailUrl, getFullSizeUrl } from "../services/cloudinaryService";

interface PhotoGalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <ImageIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg mb-2">
          No photos uploaded yet. Be the first to share a memory!
        </p>
        <p className="text-gray-400 text-sm">
          Photos will be stored securely in Cloudinary with metadata
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Wedding Photo Gallery
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {photos.length} beautiful memories shared • Powered by Cloudinary
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-square relative">
                <img
                  src={
                    photo.publicId ? getThumbnailUrl(photo.publicId) : photo.url
                  }
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {photo.cloudinaryData && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {photo.cloudinaryData.width} × {photo.cloudinaryData.height}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 truncate">
                  {photo.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <User className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{photo.uploaderName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span>{photo.uploadDate.toLocaleDateString()}</span>
                </div>
                {photo.cloudinaryData?.format && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <FileText className="h-3 w-3 mr-1" />
                    <span>{photo.cloudinaryData.format.toUpperCase()}</span>
                    {photo.cloudinaryData.bytes && (
                      <span className="ml-1">
                        • {formatFileSize(photo.cloudinaryData.bytes)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for enlarged photo view */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={
                  selectedPhoto.publicId
                    ? getFullSizeUrl(selectedPhoto.publicId)
                    : selectedPhoto.url
                }
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {selectedPhoto.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-medium">
                      Uploaded by {selectedPhoto.uploaderName}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{formatDate(selectedPhoto.uploadDate)}</span>
                  </div>
                </div>
                {selectedPhoto.cloudinaryData && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>Dimensions:</strong>{" "}
                      {selectedPhoto.cloudinaryData.width} ×{" "}
                      {selectedPhoto.cloudinaryData.height}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>Format:</strong>{" "}
                      {selectedPhoto.cloudinaryData.format?.toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>File size:</strong>{" "}
                      {formatFileSize(selectedPhoto.cloudinaryData.bytes)}
                    </div>
                    {selectedPhoto.publicId && (
                      <div className="text-sm text-gray-600">
                        <strong>Cloudinary ID:</strong> {selectedPhoto.publicId}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500 border-t pt-3">
                <div className="mb-1">
                  <strong>Original filename:</strong> {selectedPhoto.fileName}
                </div>
                {selectedPhoto.cloudinaryData?.tags &&
                  selectedPhoto.cloudinaryData.tags.length > 0 && (
                    <div>
                      <strong>Tags:</strong>{" "}
                      {selectedPhoto.cloudinaryData.tags.join(", ")}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
