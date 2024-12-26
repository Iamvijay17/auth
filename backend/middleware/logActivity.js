import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async (req, res, next) => {
  const { user } = req;
  const { method, originalUrl } = req;

  try {
    await ActivityLog.create({
      userId: user.id,
      action: `${method} ${originalUrl}`,
      timestamp: new Date(),
    });

    next();
  } catch (error) {
    console.error('Failed to log activity:', error);
    next();
  }
};
