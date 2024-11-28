// videoMulterMiddleware.js
const multer = require('multer');

// Create disk storage for thumbnail and video uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === 'thumbnail') {
            callback(null, './uploads/thumbnail'); // Store thumbnails in 'uploads/thumbnails'
        } else if (file.fieldname === 'video') {
            callback(null, './uploads/videos'); // Store videos in 'uploads/videos'
        } else {
            callback(new Error("Invalid field name"), false);
        }
    },
    filename: (req, file, callback) => {
        const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

// File filter to handle both images and videos
const fileFilter = (req, file, callback) => {
    if (file.fieldname === 'thumbnail') {
        // Allow only image formats for thumbnails
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error("Only png, jpg, jpeg files are allowed for thumbnail"));
        }
    } else if (file.fieldname === 'video') {
        // Allow only video formats for videos
        if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mkv' || file.mimetype === 'video/avi') {
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error("Only mp4, mkv, avi files are allowed for video"));
        }
    }
};

// Create new multer config for both thumbnail and video uploads
const multerThumbnailVideoConfig = multer({
    storage,
    fileFilter
});

// Middleware for handling both thumbnail and video uploads
const uploadThumbnailAndVideo = multerThumbnailVideoConfig.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]);

// Export only the uploadThumbnailAndVideo middleware
module.exports = uploadThumbnailAndVideo;
