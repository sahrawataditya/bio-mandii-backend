import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "Please provide token", success: false });
  }
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifiedToken) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  req.user = verifiedToken;
  next();
};
