import express from 'express';
import { getMe, googleLogin } from "../controllers/auth.controller.js";
import { protectRoute } from '../middleware/protectedRoute.js';

const router = express.Router();

router.post('/google' , googleLogin);
router.get('/me' , protectRoute , getMe)

export default router;


