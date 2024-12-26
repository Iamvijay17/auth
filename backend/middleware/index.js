import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT and user roles.
 */
export const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Assuming "Bearer <token>"
  
  if (!token) {
    return res.status(403).json({ message: "Token is missing" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Check for required fields in the payload
    if (!decoded.userId || !decoded.role) {
      return res.status(403).json({ message: "Token is invalid or missing role information" });
    }

    // Attach the user data to the request object
    req.user = decoded; // Contains the userId, role, and other payload data
    next(); // Continue to the next middleware or route handler
  });
};


export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Ensure `verifyToken` middleware has already run
    if (!req.user) {
      return res.status(403).json({ message: "User not authenticated" });
    }

    // Check if the user's role is in the allowedRoles array
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required roles: ${allowedRoles.join(', ')}`,
      });
    }

    next(); // Continue to the next middleware or route handler
  };
};
