import Notification from '../models/Notification.js';

/**
 * Create a notification for a user
 */
export const createNotification = async (req, res) => {
  const { userId, message, type } = req.body;

  try {
    const notification = new Notification({
      user: userId,
      message,
      type,
    });
    await notification.save();
    res.status(200).json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get unread notifications for a user
 */
export const getUnreadNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await Notification.find({ user: userId, isRead: false });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Mark notification as read
 */
export const markAsRead = async (req, res) => {
  const notificationId = req.params.id;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
