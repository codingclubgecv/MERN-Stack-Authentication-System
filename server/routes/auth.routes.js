import express from "express";
import {
    registerUser,
    verifyEmail,
    loginUser,
    sendOtp,
    verifyOtp,
    forgotPassword,
    resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


export default router;