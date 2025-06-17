import { Cloudinary } from 'cloudinary-core';

// Replace with your actual cloud name
export const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
export const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'wedding-gallery-upload';

// Initialize Cloudinary instance
export const cloudinary = new Cloudinary({
    cloud_name: CLOUD_NAME,
    secure: true
});

// Upload function for client-side uploads
export const uploadToCloudinary = async (
    file: File,
    uploaderName: string,
    title?: string
): Promise<any> => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    // Add metadata for the uploaded image
    const context = {
        uploader_name: uploaderName,
        title: title || file.name.split('.')[0],
        upload_date: new Date().toISOString(),
        original_filename: file.name
    };

    formData.append('context', Object.entries(context).map(([key, value]) => `${key}=${value}`).join('|'));

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

// Function to fetch all Shutterly Wedded images
export const fetchGalleryImages = async (): Promise<any[]> => {
    try {
        const response = await fetch(
            `https://res.cloudinary.com/${CLOUD_NAME}/image/list/wedding-gallery.json`
        );

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.resources || [];
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        return [];
    }
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, options: any = {}) => {
    return cloudinary.url(publicId, {
        quality: 'auto',
        fetch_format: 'auto',
        ...options
    });
}; 