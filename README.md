# Shutterly Wedded 📸💍

A beautiful React application for sharing and viewing wedding photos. Shutterly Wedded allows wedding guests to upload their photos and view all the memories shared by other guests, powered by Cloudinary for professional image management and optimization.

## Features

- 📷 **Photo Upload**: Drag-and-drop or click to upload multiple photos at once 
- 🖼️ **Photo Gallery**: View all uploaded photos in a beautiful grid layout 
- 🔍 **Photo Modal**: Click on any photo to view it in full size with details 
- 👤 **Photo Attribution**: Each photo shows who uploaded it and when 
- 📱 **Responsive Design**: Works great on desktop, tablet, and mobile devices 
- ☁️ **Cloud-Powered**: Images hosted and optimized by Cloudinary
- 🚀 **Fast Loading**: Automatic image optimization and CDN delivery
- 🏷️ **Smart Metadata**: Automatic tagging and custom metadata storage

## Technologies Used 
- React 18 with TypeScript 
- Tailwind CSS for styling 
- Lucide React for icons
- Cloudinary for image hosting, optimization, and management

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- A Cloudinary account (free tier available)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd wedding-gallery
npm install
```

### 2. Cloudinary Setup

1. **Create a Cloudinary Account**:
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Go to your [Dashboard](https://console.cloudinary.com/)

2. **Find Your Credentials**:
   - **Cloud Name**: Found at the top of your Cloudinary dashboard
   - **Upload Preset**: You'll need to create this (see step 3)

3. **Create Upload Preset**:
   - In Cloudinary Console, go to Settings → Upload
   - Click "Add upload preset"
   - Set these settings:
     - **Preset name**: `wedding-gallery-upload`
     - **Signing Mode**: `Unsigned`
     - **Folder**: `wedding-gallery`
     - **Tags**: `wedding-gallery,user-upload`
### 3. Environment Variables

Create a `.env` file in the project root directory:

```bash
# Create .env file
touch .env
```

Add your Cloudinary credentials to the `.env` file:

```bash
# Cloudinary Configuration
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
REACT_APP_CLOUDINARY_UPLOAD_PRESET=wedding-gallery-upload
```

**Important**: 
- Replace `your-cloud-name-here` with your actual Cloudinary cloud name
- Never commit the `.env` file to version control
- The `.env` file should be in your project root (same level as `package.json`)

### 4. Start the Application

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000`

## Usage 

### Uploading Photos 

1. Click the "Upload Photos" button in the navigation 
2. Enter your name 
3. Drag and drop photos or click to select files 
4. Watch the upload progress and see your photos appear instantly
5. Photos are automatically optimized and stored in Cloudinary

### Viewing Photos 
1. Click the "Gallery" button in the navigation 
2. Browse through all uploaded photos with optimized thumbnails
3. Click on any photo to view it in full size 
4. See detailed metadata including uploader, upload date, and image analysis
5. Use the "Refresh" button to load newly uploaded photos

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REACT_APP_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | ✅ Yes | `my-wedding-app` |
| `REACT_APP_CLOUDINARY_UPLOAD_PRESET` | Upload preset name | ✅ Yes | `wedding-gallery-upload` |

## Deployment

### Environment Variables for Production

When deploying to production (Vercel, Netlify, etc.), add these environment variables in your hosting platform's settings:

**Vercel**: Project Settings → Environment Variables
**Netlify**: Site Settings → Environment Variables
**Heroku**: Settings → Config Vars

```bash
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=wedding-gallery-upload
```

## Troubleshooting

### Common Issues

**"Upload failed" errors**:
- ✅ Check that your `.env` file exists and has the correct variables
- ✅ Verify your cloud name is correct (check Cloudinary dashboard)
- ✅ Ensure upload preset `wedding-gallery-upload` exists and is set to "Unsigned"
- ✅ Restart your development server after adding environment variables

**Photos not appearing in gallery**:
- ✅ Check browser console for error messages
- ✅ Verify photos are uploaded to the `wedding-gallery` folder in Cloudinary
- ✅ Ensure photos are tagged with `wedding-gallery`

**Environment variables not working**:
- ✅ Restart development server (`npm start`)
- ✅ Check that `.env` file is in project root (same level as `package.json`)
- ✅ Verify variable names start with `REACT_APP_`
- ✅ No spaces around the `=` sign in `.env` file

## Project Structure

```
shutterly-wedded/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── PhotoGallery.tsx
│   │   └── PhotoUpload.tsx
│   ├── config/
│   │   └── cloudinary.ts
│   ├── services/
│   │   └── cloudinaryService.ts
│   ├── types/
│   │   └── Photo.ts
│   └── App.tsx
├── .env (you create this)
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For detailed setup instructions, see [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md)

For Cloudinary-specific questions:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [React Integration Guide](https://cloudinary.com/documentation/react_integration)

---

Made with ❤️ for capturing beautiful wedding memories

