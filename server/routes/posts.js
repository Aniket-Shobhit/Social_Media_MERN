import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';
import { createPost } from '../controllers/posts.js';
import { upload } from '../controllers/auth.js';

const router = express.Router();

// read
router.get('/', verifyToken, getFeedPosts); 
router.get('/:userId/posts', verifyToken, getUserPosts);

// write
router.post('/', verifyToken, upload.single('picture'), createPost);

// update
router.patch('/:id/like', verifyToken, likePost);

export default router;