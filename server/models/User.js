import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    lastOtpSentAt: {
        type: Date
    },
    otpRequestCount: {
        type: Number,
        default: 0
    },
    otpRequestDate: {
        type: Date
    },
    lastResetRequestAt: {
        type: Date,
        default: null
    },
    verificationToken: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpiry: {
        type: Date
    },
}, { timestamps: true });

export default mongoose.model('User', userSchema);