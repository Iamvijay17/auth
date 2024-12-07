import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    verificationCode: { type: String },
    verificationExpires: { type: Date },
}, {
    timestamps: true,
});

export const User = mongoose.model("User", userSchema);