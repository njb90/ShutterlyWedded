import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export interface ToastProps {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 4000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Auto-close timer
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match animation duration
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-white border-green-300 shadow-green-100";
      case "error":
        return "bg-white border-red-300 shadow-red-100";
      case "info":
        return "bg-white border-blue-300 shadow-blue-100";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "info":
        return "text-blue-800";
    }
  };

  return (
    <div
      className={`
        w-full max-w-sm
        ${getBackgroundColor()}
        border-2 rounded-lg shadow-xl p-4 backdrop-blur-sm
        transition-all duration-300 ease-in-out transform
        ${
          isVisible && !isLeaving
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95"
        }
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${getTextColor()}`}>{title}</h3>
          {message && (
            <p className={`mt-1 text-sm ${getTextColor()} opacity-75`}>
              {message}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 ml-4">
          <button
            onClick={handleClose}
            className={`inline-flex rounded-full p-1 ${getTextColor()} hover:bg-gray-100 transition-all hover:scale-110`}
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Container Component
export interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
}) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] w-96 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
};
