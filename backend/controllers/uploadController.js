import fs from "fs";
import axios from "axios";
import path from "path";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

// GitHub configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "iamvijay17";
const REPO_NAME = "auth";
const BRANCH_NAME = "master";

// Middleware to handle avatar upload
const handleAvatarUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded or invalid file format." });
    }

    const filePath = path.resolve(req.file.path); 
    const fileBuffer = fs.readFileSync(filePath); // Read the file as buffer

    const timestamp = Date.now();
    const sanitizedFilename = req.file.originalname.replace(/\s/g, "_");
    const fileName = `${timestamp}-${sanitizedFilename}`;

    const fileContent = fileBuffer.toString("base64");

    const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/backend/uploads/avatars/${fileName}`;

    const response = await axios.put(
      githubApiUrl,
      {
        message: `Upload avatar: ${fileName}`,
        content: fileContent,
        branch: BRANCH_NAME,
      },
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    const avatarUrl = response.data.content.download_url;

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { avatar: avatarUrl },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ avatarUrl });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return res.status(500).json({ message: "Failed to upload avatar", error: error.message });
  }
};

export { handleAvatarUpload };
