import express from 'express';
import { login } from '../controllers/auth.js';
import { upload } from '../controllers/auth.js';
import { register } from '../controllers/auth.js';

const router = express.Router();

router.post('/register',upload.single('picture'), register);
router.post('/login', login);

export default router;