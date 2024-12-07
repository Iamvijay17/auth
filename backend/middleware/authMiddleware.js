import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];  // Assuming the format is "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "Token is missing" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Attach the user data to the request object
    req.user = decoded;  // Contains the userId and other payload data
    next();  // Continue to the next middleware or route handler
  });
};
