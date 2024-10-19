import cloudinary from 'cloudinary';

const connectCloudinary = async () => {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRATE_KEY
    });
}

export default connectCloudinary;
