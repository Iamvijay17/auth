import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
    role: { type: String, enum: ['user', 'admin'], default: 'user',},
    permissions: {
      type: [String],
      default: ["manageUsers", "manageDestinations", "viewReports"], // List of admin permissions
    },
     settings: {
      language: {
        type: String,
        default: 'en',  // Default language: English
      },
      notificationsEnabled: {
        type: Boolean,
        default: true,  // Default: Notifications enabled
      },
  },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
