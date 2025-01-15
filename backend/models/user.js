import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // Basic Details
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    phoneNumber: { type: String },
    birthDate: { type: Date },

    // Account Status
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isBanned: { type: Boolean, default: false },
    banReason: { type: String },

    // Roles and Permissions
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator', 'superadmin', 'support'],
      default: 'user',
    },
    permissions: {
      type: [String],
      default: ['manageUsers', 'manageDestinations', 'viewReports'],
    },

    // Settings
    settings: {
      language: { type: String, default: 'en' },
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
      timezone: { type: String, default: 'UTC' },
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
      },
      privacy: {
        profileVisibility: {
          type: String,
          enum: ['public', 'private', 'friends', 'organization'],
          default: 'public',
        },
        dataSharing: { type: Boolean, default: false },
      },
    },

    // Security Features
    lastLogin: { type: Date, default: Date.now },
    failedLoginAttempts: { type: Number, default: 0 },
    lockoutTime: { type: Date },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    securityQuestions: [
      {
        question: { type: String },
        answerHash: { type: String }, // Hashed answer for added security
      },
    ],

    // Subscription Management
    subscription: {
      plan: { type: String, enum: ['free', 'basic', 'premium', 'enterprise'], default: 'free' },
      startDate: { type: Date },
      endDate: { type: Date },
      isAutoRenew: { type: Boolean, default: true },
      usageLimits: {
        apiCalls: { type: Number, default: 1000 },
        storage: { type: Number, default: 5 }, // In GB
      },
    },

    // Address and Billing
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String, default: 'United States' },
    },
    billingDetails: {
      cardHolderName: { type: String },
      cardNumber: { type: String },
      expiryDate: { type: String },
      cvv: { type: String },
      billingAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String },
      },
    },

    // Audit Logs
    auditLogs: [
      {
        action: { type: String, required: true }, // e.g., "login", "profile_update"
        timestamp: { type: Date, default: Date.now },
        ipAddress: { type: String },
        userAgent: { type: String },
        details: { type: String },
      },
    ],

    // Social Login
    socialLogin: {
      googleId: { type: String },
      facebookId: { type: String },
      twitterId: { type: String },
      linkedInId: { type: String },
      githubId: { type: String },
    },


    // User Preferences
    preferences: {
      theme: { type: String, default: 'light' },
      dashboardLayout: { type: String, default: 'default' },
      communication: {
        sms: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
        pushNotifications: { type: Boolean, default: true },
      },
    },

    // User Activity
    lastActivity: { type: Date, default: Date.now },
    onlineStatus: { type: Boolean, default: false },
    isAccountDeactivated: { type: Boolean, default: false },

    // Advanced Tracking
    deletedAt: { type: Date },
    lockoutReason: { type: String },
    loginDevices: [
      {
        deviceId: { type: String },
        deviceType: { type: String }, // e.g., "mobile", "desktop"
        lastUsed: { type: Date },
        ipAddress: { type: String },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field
  }
);

const User = mongoose.model('User', userSchema);
export default User;
