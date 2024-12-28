import fs from "fs";
import multer from "multer";
import path from "path";
import User from "../models/user.js"; 

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/avatars/";

    // Check if directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize Multer with storage configuration and file size limit (example: 5MB limit)
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files (you can adjust this based on your needs)
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      console.log("File type is allowed", file.mimetype);
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG, PNG, and GIF are allowed."), false);
    }
  },
});

// Profile avatar upload handler
const uploadAvatar = upload.single("avatar");

const handleAvatarUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Construct the avatar URL
  const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/avatars/${req.file.filename}`;

  try {

    const userId = req.user.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the URL back in the response
    return res.json({ avatarUrl, user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Export the controller functions
export {
  uploadAvatar,
  handleAvatarUpload,
};
