import multer from "multer";

// Configure Multer storage options
const storage = multer.diskStorage({
  // Define the folder where the uploaded files will be stored
  destination: function (req, file, callback) {
    callback(null, 'uploads/'); // Make sure the 'uploads/' folder exists
  },
  // Define the file name format for uploaded files
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname); // Create a unique name using the timestamp
  },
});

// Set up multer middleware with the storage configuration
const upload = multer({ storage });

// Export the upload middleware for use in routes
export default upload;
