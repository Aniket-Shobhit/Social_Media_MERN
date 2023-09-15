import Post from '../models/Post.js';
import User from '../models/User.js';
import cloudStoreImage from '../utils/cloudinary.js';

// create
export const createPost = async (req, res) => {
    try {
        const { userId, description, picture } = req.body;
        let pictureUrl = '';
        if(picture) {
            const cloudPicture = await cloudStoreImage(picture);
            pictureUrl = cloudPicture.secure_url;
        }
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPictureUrl: user.pictureUrl,
            pictureUrl,
            likes: {},
            comments: []
        });
        await newPost.save();

        const post = await Post.find();
        //sorts the post in descending order
        post.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        res.status(201).json(post);
    } catch(err) {
        res.status(409).json({ message: err.message });
    } 
}

// read
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        post.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        res.status(200).json(post);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        post.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        res.status(200).json(post);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

// update
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        
        if(isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatePost);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}