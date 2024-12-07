import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  // Get token from Authorization header (it should start with "Bearer ")
  const token = req.header('Authorization')?.split(' ')[1]; // Get the token part after "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token using jwt.verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();  // Pass the request to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(400).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

export default authenticateUser;
