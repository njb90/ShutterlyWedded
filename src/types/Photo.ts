export interface Photo {
    id: string;
    url: string;
    title: string;
    uploaderName: string;
    uploadDate: Date;
    fileName: string;
    // Cloudinary specific fields
    publicId?: string;
    cloudinaryData?: {
        public_id: string;
        secure_url: string;
        context?: Record<string, string>;
        tags?: string[];
        created_at?: string;
        format?: string;
        width?: number;
        height?: number;
        bytes?: number;
    };
}