import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secrect: process.env.CLOUDINARY_API_SECRET
// });
cloudinary.config({
    cloud_name: 'dkbuod2hg',
    api_key: '275233576541235',
    api_secret: 'HyuwI2BA5Yhgknv35sVe5h97otw',
});

const opts = {
    resource_type: 'image',
    overwrite: true,
    invalidate: true,
}

const cloudStoreImage = async (image) => {
    const url = await cloudinary.uploader.upload(image, opts, (error, result) => {
        if (result && result.secure_url) {
            return result.secure_url;
        }
        return ({ message: error.message });
    });
    return url;
};

export default cloudStoreImage;