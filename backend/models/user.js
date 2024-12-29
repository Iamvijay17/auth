import mongoose from 'mongoose';

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
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    permissions: {
      type: [String],
      default: ["manageUsers", "manageDestinations", "viewReports"],
    },
    settings: {
      language: { type: String, default: 'en' },
      notificationsEnabled: { type: Boolean, default: true },
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      preferredLanguage: { type: String, default: 'en' },
      is2FAEnabled: { type: Boolean, default: false },
      emailNotifications: { type: [String], default: [] },
      isAccountDeactivated: { type: Boolean, default: false },
      profileVisibility: { type: String, enum: ['public', 'private', 'friends'], default: 'public' }
    },
    lastActivity: { type: Date, default: Date.now },
    avatar: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    failedLoginAttempts: { type: Number, default: 0 },
    lockoutTime: { type: Date },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    socialLogin: {
      googleId: { type: String },
      facebookId: { type: String },
    },
    deletedAt: { type: Date },
    preferences: {
      theme: { type: String, default: 'light' },
      timezone: { type: String, default: 'UTC' },
    },
    onlineStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
