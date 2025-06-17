import { useState, useCallback } from 'react';
import { ToastProps } from '../components/Toast';

interface ToastData {
    type: 'success' | 'error' | 'info';
    title: string;
    message?: string;
    duration?: number;
}

export const useToast = () => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = useCallback((toastData: ToastData) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: ToastProps = {
            id,
            onClose: removeToast,
            ...toastData,
        };

        setToasts((prev) => [...prev, newToast]);
        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showSuccess = useCallback((title: string, message?: string, duration?: number) => {
        return addToast({ type: 'success', title, message, duration });
    }, [addToast]);

    const showError = useCallback((title: string, message?: string, duration?: number) => {
        return addToast({ type: 'error', title, message, duration });
    }, [addToast]);

    const showInfo = useCallback((title: string, message?: string, duration?: number) => {
        return addToast({ type: 'info', title, message, duration });
    }, [addToast]);

    return {
        toasts,
        addToast,
        removeToast,
        showSuccess,
        showError,
        showInfo,
    };
}; 