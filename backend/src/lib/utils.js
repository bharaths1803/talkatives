import jwt from "jsonwebtoken";
export const generateToken = ({ userId, res }) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    httpOnly: process.env.NODE_ENV !== "production",
    sameSite: "strict",
  });
};
