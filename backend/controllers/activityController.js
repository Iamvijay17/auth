import ActivityLog from '../models/ActivityLog.js';

/**
 * Log user activity
 */
export const logActivity = async (req, res) => {
  const { action, details } = req.body;
  const userId = req.user.id;

  try {
    const activity = new ActivityLog({
      user: userId,
      action,
      details,
    });

    await activity.save();
    res.status(200).json({ message: 'Activity logged successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get user activity logs
 */
export const getUserActivities = async (req, res) => {
  const { userId } = req.params;

  try {
    const activities = await ActivityLog.find({ user: userId });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
