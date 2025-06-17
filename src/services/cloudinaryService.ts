import { Photo } from '../types/Photo';
import { uploadToCloudinary, fetchGalleryImages, getOptimizedImageUrl } from '../config/cloudinary';

// Transform Cloudinary response to Photo interface
export const transformCloudinaryToPhoto = (cloudinaryItem: any): Photo => {
    const context = cloudinaryItem.context.custom || {};

    return {
        id: cloudinaryItem.public_id,
        url: cloudinaryItem.secure_url,
        title: context.title || cloudinaryItem.public_id,
        uploaderName: context.uploader_name || 'Anonymous',
        uploadDate: new Date(context.upload_date || cloudinaryItem.created_at),
        fileName: context.original_filename || cloudinaryItem.public_id,
        publicId: cloudinaryItem.public_id,
        cloudinaryData: {
            public_id: cloudinaryItem.public_id,
            secure_url: cloudinaryItem.secure_url,
            context: context,
            tags: cloudinaryItem.tags,
            created_at: cloudinaryItem.created_at,
            format: cloudinaryItem.format,
            width: cloudinaryItem.width,
            height: cloudinaryItem.height,
            bytes: cloudinaryItem.bytes,
        }
    };
};

// Upload multiple files to Cloudinary
export const uploadPhotos = async (
    files: File[],
    uploaderName: string
): Promise<Photo[]> => {
    const uploadPromises = files.map(file =>
        uploadToCloudinary(file, uploaderName)
    );

    try {
        const results = await Promise.all(uploadPromises);
        return results.map(transformCloudinaryToPhoto);
    } catch (error) {
        console.error('Error uploading photos:', error);
        throw new Error('Failed to upload photos. Please try again.');
    }
};

// Fetch all gallery photos from Cloudinary
export const getGalleryPhotos = async (): Promise<Photo[]> => {
    try {
        const cloudinaryImages = await fetchGalleryImages();
        return cloudinaryImages.map(transformCloudinaryToPhoto);
    } catch (error) {
        console.error('Error fetching gallery photos:', error);
        return [];
    }
};

// Get thumbnail URL for gallery display
export const getThumbnailUrl = (publicId: string): string => {
    return getOptimizedImageUrl(publicId, {
        width: 300,
        height: 300,
        crop: 'fill',
        gravity: 'auto'
    });
};

// Get full size URL for modal display
export const getFullSizeUrl = (publicId: string): string => {
    return getOptimizedImageUrl(publicId, {
        width: 1200,
        height: 800,
        crop: 'limit'
    });
}; 