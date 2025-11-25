import { Router } from "express";
import { prisma } from "../lib/prisma.js";
const verifyPhoneNumberRouter = Router();

verifyPhoneNumberRouter.post("/", async (req, res) => {
  try {
    const { phone_number, code } = req.body;

    const user = await prisma.users.findUnique({
      where: { phone_number }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const OTP_EXPIRATION_MINUTES = 10;
    const now = new Date();
    const otpTime = new Date(user.changed_at || user.created_at); // fallback
    const diffMinutes = (now - otpTime) / 1000 / 60;

    if (diffMinutes > OTP_EXPIRATION_MINUTES) {
      return res.status(403).json({ valid: false, message: "Verification code expired" });
    }

    if (user.verified_phone_code !== parseInt(code, 10)) {
      return res.status(400).json({ message: "Invalid phone verification code" });
    }

    const verificationRecord = await prisma.users.update({
      where: { user_id: user.user_id },
      data: { is_phone_verified: true }
    });

    return res.status(200).json({
      message: "Phone number verified successfully",
      data: verificationRecord
    });

  } catch (error) {
    console.error("Phone verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default verifyPhoneNumberRouter;
