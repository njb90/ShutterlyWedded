import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { PhotoGallery } from "./components/PhotoGallery";
import { PhotoUpload } from "./components/PhotoUpload";
import { ToastContainer } from "./components/Toast";
import { Photo } from "./types/Photo";
import { getGalleryPhotos } from "./services/cloudinaryService";
import { useToast } from "./hooks/useToast";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState<"gallery" | "upload">(
    "gallery"
  );
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [optimisticPhotos, setOptimisticPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toasts, removeToast, showSuccess, showError } = useToast();

  // Helper to merge optimistic photos with API photos, deduplicating by publicId
  const mergePhotos = (apiPhotos: Photo[], optimistic: Photo[]) => {
    const apiIds = new Set(apiPhotos.map((p) => p.publicId || p.id));
    // Only keep optimistic photos not present in API
    const stillOptimistic = optimistic.filter(
      (p) => !(p.publicId && apiIds.has(p.publicId))
    );
    // Prepend optimistic photos
    return [...stillOptimistic, ...apiPhotos];
  };

  // Fetch photos from Cloudinary on app load
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const cloudinaryPhotos = await getGalleryPhotos();
        setPhotos(mergePhotos(cloudinaryPhotos, optimisticPhotos));
        // Remove any optimistic photos that are now present in API
        setOptimisticPhotos((prev) =>
          prev.filter(
            (p) =>
              !cloudinaryPhotos.some((apiP) => apiP.publicId === p.publicId)
          )
        );
      } catch (err) {
        console.error("Error loading photos:", err);
        setError(
          "Failed to load photos from Cloudinary. Please check your configuration."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePhotosUploaded = (newPhotos: Photo[]) => {
    // Add new photos to the beginning of the array (most recent first)
    setPhotos((prevPhotos) => [...newPhotos, ...prevPhotos]);
    setOptimisticPhotos((prev) => [...newPhotos, ...prev]); // Track as optimistic
    // Switch to gallery view to see the uploaded photos
    setCurrentView("gallery");
    // Optionally: Remove optimistic photos after 90s if not confirmed by API
    setTimeout(() => {
      setOptimisticPhotos((prev) =>
        prev.filter((p) => !photos.some((apiP) => apiP.publicId === p.publicId))
      );
    }, 90000);
  };

  const refreshGallery = async () => {
    try {
      setIsLoading(true);
      const cloudinaryPhotos = await getGalleryPhotos();
      setPhotos(mergePhotos(cloudinaryPhotos, optimisticPhotos));
      // Remove any optimistic photos that are now present in API
      setOptimisticPhotos((prev) =>
        prev.filter(
          (p) => !cloudinaryPhotos.some((apiP) => apiP.publicId === p.publicId)
        )
      );
    } catch (err) {
      console.error("Error refreshing gallery:", err);
      showError(
        "Failed to refresh gallery",
        "Please check your connection and try again"
      );
      setError("Failed to refresh gallery.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onRefresh={refreshGallery}
      />

      <main className="py-8">
        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Configuration Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <p className="mt-1">
                    Please make sure you have set up your Cloudinary environment
                    variables and upload preset.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === "gallery" ? (
          <>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
                <span className="ml-3 text-gray-600">
                  Loading photos from Cloudinary...
                </span>
              </div>
            ) : (
              <PhotoGallery photos={photos} />
            )}
          </>
        ) : (
          <PhotoUpload
            onPhotosUploaded={handlePhotosUploaded}
            showSuccess={showSuccess}
            showError={showError}
          />
        )}
      </main>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg mb-2">Sarah & Michael - January 15, 2024</p>
          <p className="text-gray-400 mb-2">
            Thank you for sharing in our special day and capturing these
            precious memories!
          </p>
          <p className="text-xs text-gray-500">
            Photos securely stored and delivered by Cloudinary
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
