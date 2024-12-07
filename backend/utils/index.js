import jwt from "jsonwebtoken";

export const generateVerificationCode = () => {
   return Math.floor(100000 + Math.random() * 900000);
};

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const generatePasswordResetToken = (userId) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
