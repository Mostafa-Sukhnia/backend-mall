import { Router } from "express";
import {generateToken, verifyToken} from "../lib/auth.js";
export const loginRouter = Router();

loginRouter.get("/", (_req, res) => {
  res.json({ message: "Login route working (GET)" });
});

loginRouter.post("/", (req, res) => {
  const { email, password } = req.body;

  const token = generateToken({ userId: 1, username: "mustafa" });

  res.cookie("auth_token", token, {
    httpOnly: true,       
    secure: false,        
    sameSite: "lax",      
    maxAge: 60 * 60 * 1000 
  });

  res.json({
    success: true,
    message: "Login data received",
  });
});
