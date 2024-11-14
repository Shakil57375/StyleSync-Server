import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// This is the ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Define the upload folder path
        const uploadPath = path.join(__dirname, '../uploads/');

        // Check if the folder exists, if not, create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        callback(null, uploadPath); // Use the folder path for storing uploads
    },
    filename: function (req, file, callback) {
        // Create a unique filename with timestamp
        callback(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Export the upload middleware for use in routes
export default upload;
