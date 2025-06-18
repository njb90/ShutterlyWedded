import React from "react";
import { Image, Upload, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { NavigationMenu } from "./ui/navigation-menu";

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

  const navItems = [
    {
      label: "Gallery",
      icon: <Image className="h-6 w-6" />,
      onClick: () => onViewChange("gallery"),
      active: currentView === "gallery",
    },
    {
      label: "Upload",
      icon: <Upload className="h-6 w-6" />,
      onClick: () => onViewChange("upload"),
      active: currentView === "upload",
    },
  ];

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <NavigationMenu
            items={navItems}
            className="bg-transparent border-none flex-1"
          />
          {currentView === "gallery" && onRefresh && (
            <div className="px-6 py-4">
              <Button
                onClick={handleRefresh}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                title="Refresh gallery from Cloudinary"
              >
                <RefreshCw className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Refresh</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
