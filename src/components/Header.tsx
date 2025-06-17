import React from "react";
import { Heart, Camera, RefreshCw } from "lucide-react";

interface HeaderProps {
  currentView: "gallery" | "upload";
  onViewChange: (view: "gallery" | "upload") => void;
  onRefresh?: () => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onRefresh,
}) => {
  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh();
    }
  };

  return (
    <header className="bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-8 w-8 mr-3" />
            <h1 className="text-2xl font-bold">Shutterly Wedded</h1>
          </div>

          <nav className="flex space-x-4">
            <button
              onClick={() => onViewChange("gallery")}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === "gallery"
                  ? "bg-white text-pink-600 font-semibold"
                  : "hover:bg-pink-400"
              }`}
            >
              <Heart className="h-4 w-4 mr-2" />
              Gallery
            </button>
            <button
              onClick={() => onViewChange("upload")}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === "upload"
                  ? "bg-white text-pink-600 font-semibold"
                  : "hover:bg-pink-400"
              }`}
            >
              <Camera className="h-4 w-4 mr-2" />
              Upload Photos
            </button>
            {currentView === "gallery" && onRefresh && (
              <button
                onClick={handleRefresh}
                className="flex items-center px-4 py-2 rounded-lg transition-colors hover:bg-pink-400"
                title="Refresh gallery from Cloudinary"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
