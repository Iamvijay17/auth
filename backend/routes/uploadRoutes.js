import express from 'express';
import { uploadAvatar, handleAvatarUpload } from "../controllers/uploadController.js";
import { authorizeRoles, verifyToken } from "../middleware/index.js";

const router = express.Router();

router.post("/upload-avatar", verifyToken, authorizeRoles('vendor', 'admin', 'user'), uploadAvatar, handleAvatarUpload);

router.get("/avatars/:filename", (req, res) => {
  const filename = req.params.filename;
  const avatarPath = path.resolve("uploads/avatars", filename);

  // Send the file if it exists
  res.sendFile(avatarPath, (err) => {
    if (err) {
      res.status(404).json({ message: "Avatar not found" });
    }
  });
});

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
