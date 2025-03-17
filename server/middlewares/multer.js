import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

// Debug messages for Cloudinary configuration
console.log('Initializing CloudinaryStorage...');
console.log('Cloudinary configuration:', cloudinary.config().cloud_name ? 'Loaded' : 'Not loaded');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // File types
  },
});

// Debug message for storage setup
console.log('CloudinaryStorage initialized successfully with folder: "uploads" and allowed formats: ["jpg", "png", "jpeg"]');

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB (example)
  fileFilter: (req, file, cb) => {
    console.log(`Processing file upload: ${file.originalname}, MIME type: ${file.mimetype}`);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      console.error(`File type not allowed: ${file.mimetype}`);
      return cb(new Error('File type not allowed'), false);
    }
    console.log('File passed validation.');
    cb(null, true);
  },
});

// Debug message for successful upload middleware creation
console.log('Multer upload middleware created successfully.');

export default upload;
