import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

export const hashPassword = async (password) => {
  const saltRounds = 10;      
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export const  checkPassword =  async (inputPassword, storedHash) => {
  const match = await bcrypt.compare(inputPassword, storedHash);
  return match;
}