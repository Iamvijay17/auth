import jwt from "jsonwebtoken";

export const generateToken = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const generatePasswordResetToken = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};