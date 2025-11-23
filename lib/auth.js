import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";

const JWT_SECRET = process.env.KeyJWT;

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Payload:", decoded);
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return false; 
  }
};
