import { Router } from "express";
import { verifyToken } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";
import generateOTP from "../lib/generateOTP.js";
import { sendDevEmail } from "../lib/mail.js";

const askForChangePasswordRouter = Router();

askForChangePasswordRouter.post("/", async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    } else if (!verifyToken(token)) {
      return res.status(403).json({ message: "Forbidden" });
    } else {
      const { userId } = verifyToken(token);
      const verified_code = generateOTP();

      const user = await prisma.users.findUnique({
        where: { user_id: userId },
      });
      if (!user) {

      }else if (!user.is_verified) {
        return res
          .status(400)
          .json({ message: "Please verify your account first." });
      }else if (user.password_reset_requested) {
        return res
          .status(400)
          .json({ message: "Password reset already requested." });
      }else{
      const updataUser = await prisma.users.update({
        where: { user_id: userId },
        data: { password_reset_requested: true, verified_code },
      });
      await sendDevEmail(
        user.email,
        verified_code,
        "password"
      );
      res
        .status(200)
        .json({
          message:
            "Password reset requested. Check your email for the verification code.",
          user,
        });
    }
    }
  } catch (error) {
    console.error("Error in ask-for-change-password:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default askForChangePasswordRouter;
