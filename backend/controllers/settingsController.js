import User from '../models/user.js';

/**
 * Get user settings
 */
export const getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update user settings
 */

export const updateUserSettings = async (req, res) => {
  const { language, notificationsEnabled, theme, preferredLanguage, is2FAEnabled, emailNotifications, isAccountDeactivated, profileVisibility } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return handleErrorResponse(res, 404, "User not found");
    }

    // Update settings
    user.settings.language = language || user.settings.language;
    user.settings.notificationsEnabled = notificationsEnabled !== undefined ? notificationsEnabled : user.settings.notificationsEnabled;
    user.settings.theme = theme || user.settings.theme;
    user.settings.preferredLanguage = preferredLanguage || user.settings.preferredLanguage;
    user.settings.is2FAEnabled = is2FAEnabled !== undefined ? is2FAEnabled : user.settings.is2FAEnabled;
    user.settings.emailNotifications = emailNotifications || user.settings.emailNotifications;
    user.settings.isAccountDeactivated = isAccountDeactivated !== undefined ? isAccountDeactivated : user.settings.isAccountDeactivated;
    user.settings.profileVisibility = profileVisibility || user.settings.profileVisibility;

    await user.save();

    return handleSuccessResponse(res, 200, "Settings updated", user.settings);
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
};


// Get settings for all users (only for admin role)
export const getAllUserSettings = async (req, res) => {
  if (req.user.role !== "admin") {
    return handleErrorResponse(res, 403, "Access denied");
  }

  try {
    const users = await User.find({});
    const settings = users.map(user => ({ userId: user.userId, settings: user.settings }));
    return handleSuccessResponse(res, 200, "All user settings fetched", settings);
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
};

// Toggle notification settings (for user and admin roles)
export const toggleNotifications = async (req, res) => {
  const { notificationsEnabled } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return handleErrorResponse(res, 404, "User not found");
    }

    user.settings.notificationsEnabled = notificationsEnabled;
    await user.save();
    return handleSuccessResponse(res, 200, "Notification settings updated", user.settings.notificationsEnabled);
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
};

// Additional function to toggle 2FA
export const toggle2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return handleErrorResponse(res, 404, "User not found");
    }

    user.settings.is2FAEnabled = !user.settings.is2FAEnabled;
    await user.save();
    
    return handleSuccessResponse(res, 200, `2FA ${user.settings.is2FAEnabled ? 'enabled' : 'disabled'}`, user.settings.is2FAEnabled);
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
};

// Update email notification preferences
export const updateEmailNotifications = async (req, res) => {
  const { emailNotifications } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return handleErrorResponse(res, 404, "User not found");
    }

    user.settings.emailNotifications = emailNotifications;
    await user.save();
    
    return handleSuccessResponse(res, 200, "Email notifications updated", user.settings.emailNotifications);
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
};

// Deactivate account
export const deactivateAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return handleErrorResponse(res, 404, "User not found");
    }

    user.settings.isAccountDeactivated = true;
    await user.save();

    return handleSuccessResponse(res, 200, "Account deactivated", user.settings.isAccountDeactivated);
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
};