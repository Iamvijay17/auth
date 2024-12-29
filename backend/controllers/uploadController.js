import fs from "fs";
import multer from "multer";
import path from "path";
import User from "../models/user.js";
import mongoose from "mongoose";

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve("uploads/avatars");

    // Ensure the directory exists
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating upload directory:", err);
        return cb(new Error("Failed to create upload directory."), null);
      }
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with a timestamp
    const timestamp = Date.now();
    const sanitizedFilename = file.originalname.replace(/\s/g, "_");
    const uniqueName = `${timestamp}-${sanitizedFilename}.${file.mimetype.split("/")[1]}`;
    cb(null, uniqueName);
  },
});

// Initialize Multer with storage configuration and file size limit
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific image types
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."), false);
    }
  },
});

// Middleware for avatar upload
const uploadAvatar = upload.single("avatar");

// Middleware to handle avatar upload
const handleAvatarUpload = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Construct the avatar URL
    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/avatars/${req.file.filename}.${req.file.mimetype.split("/")[1]}`;

    // Extract userId from the request (ensure `req.user` exists and is populated)
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update user's avatar URL in the database by querying with the custom userId field
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },  // Query by the custom userId field
      { avatar: avatarUrl },
      { new: true, runValidators: true } // Use `runValidators` to ensure schema validation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the updated user and avatar URL in the response
    return res.status(200).json({ avatarUrl });

  } catch (error) {
    console.error("Error uploading avatar:", error);

    // Handle Multer-specific errors
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer error: ${error.message}` });
    }

    // Handle other unexpected errors
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error occurred",
      stack: error.stack,  // Including stack trace for debugging in development environment
    });
  }
};


export { uploadAvatar, handleAvatarUpload };
