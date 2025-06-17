# Cloudinary Shutterly Wedded Setup Guide

Your Shutterly Wedded app has been successfully integrated with Cloudinary! This guide will help you complete the setup.

## What's Been Set Up

✅ **Upload Preset Created**: `wedding-gallery-upload`
- Configured for unsigned uploads (client-side only)
- Stores photos in `wedding-gallery` folder
- Auto-tags photos with `wedding-gallery` and `user-upload`
- Enables automatic tagging and metadata storage
- Preserves original filenames

✅ **Metadata Fields Created**:
- `uploader_name`: Stores the name of the person uploading
- `photo_title`: Stores custom photo titles

✅ **Client-Side Integration**:
- Upload component now uploads directly to Cloudinary
- Gallery component fetches photos from Cloudinary
- Optimized image delivery with automatic format and quality optimization
- Metadata display in photo details

## Required Environment Setup

1. **Create a `.env` file** in your project root with your Cloudinary credentials:

```bash
# Get these values from your Cloudinary Dashboard
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=wedding-gallery-upload
```

2. **Find your Cloud Name**:
   - Go to your [Cloudinary Console Dashboard](https://console.cloudinary.com/)
   - Your cloud name is displayed at the top of the dashboard
   - Replace `your-cloud-name` in the `.env` file with your actual cloud name

## How It Works

### Photo Upload Process
1. User selects photos and enters their name
2. Photos are uploaded directly to Cloudinary with metadata:
   - Uploader name stored in context and structured metadata
   - Original filename preserved
   - Auto-tagged for easy retrieval
   - Stored in organized `wedding-gallery` folder

### Photo Display
1. Gallery fetches photos using Cloudinary's listing API
2. Images are served with optimization:
   - Thumbnails: 300x300 with smart cropping
   - Full-size: Limited to 1200x800 for modal view
   - Automatic format conversion (WebP when supported)
   - Quality optimization

### Metadata Storage
- **Context Data**: Key-value pairs stored with each image
- **Structured Metadata**: Searchable fields for advanced querying
- **Tags**: Automatic tagging for categorization
- **Optimization**: Automatic format conversion, quality optimization, responsive delivery

## Features Included

### Client-Side Upload
- ✅ Drag & drop interface
- ✅ Progress indicators
- ✅ Error handling
- ✅ Batch uploads
- ✅ File validation

### Gallery Display
- ✅ Optimized thumbnail loading
- ✅ Lazy loading for performance
- ✅ Full-screen modal view
- ✅ Metadata display
- ✅ Responsive design

### Cloudinary Benefits
- ✅ Automatic image optimization
- ✅ CDN delivery
- ✅ Format conversion
- ✅ Quality optimization
- ✅ Secure storage
- ✅ Backup and versioning

## Testing the Integration

1. **Set up your environment variables** (see above)
2. **Start your development server**: `npm start`
3. **Test upload**:
   - Navigate to Upload Photos
   - Add your name
   - Select and upload a photo
   - Check that it appears in Cloudinary Dashboard
4. **Test gallery**:
   - Photos should load from Cloudinary
   - Click photos to view full details
   - Verify metadata is displayed correctly

## Troubleshooting

### Common Issues

**Upload fails with CORS error**:
- Verify your upload preset is set to `unsigned: true`
- Check that your cloud name is correct in `.env`

**Photos don't appear in gallery**:
- Check browser console for error messages
- Verify photos are tagged with `wedding-gallery`
- Ensure photos are in the `wedding-gallery` folder

**Environment variables not working**:
- Restart your development server after adding `.env`
- Ensure `.env` file is in the project root
- Verify variable names start with `REACT_APP_`

### Additional Configuration

**Enable auto-upload for existing images**:
```javascript
// Add to your Cloudinary config for migrating existing images
auto_upload_mapping: {
  folder: "wedding-gallery",
  resource_type: "image"
}
```

**Custom transformations**:
```javascript
// Example: Add vintage effect
cloudinary.url("sample", {
  effect: "sepia:50",
  quality: "auto",
  fetch_format: "auto"
})
```

## Security Notes

- Upload preset is configured for unsigned uploads (client-side safe)
- No API secrets exposed in frontend code
- Images stored in public folder for sharing
- Consider adding moderation for production use

## Next Steps

1. **Production deployment**: Update environment variables for production
2. **Custom domain**: Set up custom domain in Cloudinary for branded URLs
3. **Analytics**: Monitor usage in Cloudinary dashboard
4. **Backup**: Regular backup policies are automatically handled by Cloudinary

## Support

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [React Integration Guide](https://cloudinary.com/documentation/react_integration)
- [Upload API Reference](https://cloudinary.com/documentation/image_upload_api_reference)

Your Shutterly Wedded app is now powered by Cloudinary! 🎉