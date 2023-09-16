import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const opts = {
    resource_type: 'image',
    overwrite: true,
    invalidate: true,
}

const cloudStoreImage = async (image) => {
    try {
        const url = await cloudinary.uploader.upload(image, opts, (error, result) => {
            if (result && result.secure_url) {
                return result.secure_url;
            }
            return ({ message: error.message });
        });
        return url;
    } catch (error) {
        return ({ error });
    }
};

export default cloudStoreImage;