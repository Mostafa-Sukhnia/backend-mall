import { Router } from "express";
import generateOTP from "../lib/generateOtp.js";
import { prisma } from "../lib/prisma.js";
// import { sendTelegramOTP } from "../lib/telOtp.js";
const regenerateOtpPhoneNumber = Router();

regenerateOtpPhoneNumber.post("/", async (req, res) => {
  try {
    const { number } = req.body;
    const code = generateOTP();
    const user = await prisma.users.findUnique({
      where: {
        phone_number: number,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found your phone number is not correct" });
    } else if (user.is_phone_verified === true) {
      return res.status(400).json({ message: "phone number already verified" });
    } else {
      const updateUserCode = await prisma.users.update({
        where: {
          user_id: user.user_id,
        },
        data: {
          verified_phone_code: code,
        },
      });
      res
        .status(200)
        .json({ message: "code generated succsfuly", updateUserCode });
    }
  } catch (error) {
    console.error("Regenerate OTP Phone Number error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default regenerateOtpPhoneNumber;
