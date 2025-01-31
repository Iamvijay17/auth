import express from "express";
import multer from "multer";
import path from "path";
import { mkdirSync, renameSync } from "fs";
import { handleAvatarUpload } from "../controllers/uploadController.js";
import { authorizeRoles, verifyToken } from "../middleware/index.js";

const router = express.Router();

// Configure Multer for temporary file storage
const upload = multer({ dest: "uploads/avatars" });

// Serve Avatar Files
router.get("/avatars/:filename", verifyToken, authorizeRoles("vendor", "admin", "user"), (req, res) => {
  const filename = req.params.filename;
  const avatarPath = path.resolve("uploads/avatars", filename);

  res.sendFile(avatarPath, (err) => {
    if (err) {
      console.error("Avatar not found:", err);
      res.status(404).json({ message: "Avatar not found" });
    }
  });
});

// File Upload Route
router.post("/upload-avatar", verifyToken, authorizeRoles("vendor", "admin", "user"), upload.single("file"), handleAvatarUpload );



const uploadRoutes = router;

export default uploadRoutes;


/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: APIs for uploading files
 */

/**
 * @swagger
 * /api/v1/upload-avatar:
 *   post:
 *     summary: Upload a profile avatar
 *     description: Uploads an avatar image to the server and returns the URL of the uploaded image.
 *     tags: [Upload]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: avatar
 *         type: file
 *         description: The avatar image to upload
 *         required: true
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarUrl:
 *                   type: string
 *                   example: "http://localhost:5000/uploads/avatars/1638749371653-avatar.jpg"
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No file uploaded"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error uploading avatar"
 */
