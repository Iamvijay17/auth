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
  const { language, notificationsEnabled } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.settings.language = language || user.settings.language;
    user.settings.notificationsEnabled = notificationsEnabled !== undefined ? notificationsEnabled : user.settings.notificationsEnabled;

    await user.save();
    res.status(200).json({ message: 'Settings updated successfully', settings: user.settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
