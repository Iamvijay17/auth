export const hasPermission = (requiredPermission) => {
  return (req, res, next) => {
    const user = req.user; // Assuming user is added to req via JWT middleware

    if (user && user.permissions.includes(requiredPermission)) {
      next(); // Proceed if the required permission exists
    } else {
      res.status(403).json({ message: "Permission denied." });
    }
  };
};
