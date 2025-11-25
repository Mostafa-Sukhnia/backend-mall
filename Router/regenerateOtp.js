import { Router } from "express";
import generateOTP from "../lib/generateOtp.js";
import { prisma } from "../lib/prisma.js";
import { sendDevEmail } from "../lib/mail.js";

const regenerateOtp = Router();

regenerateOtp.post("/", async (req, res) => {
  const { email } = req.body;
  const code = generateOTP();
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res
      .status(400)
      .json({ message: "user not found your email is not correct" });
  } else {
    const updateUserCode = await prisma.users.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        verified_code: code,
      },
    });
    await sendDevEmail(email, code);
    res
      .status(200)
      .json({ message: "code generated succsfuly", updateUserCode });
  }
});

export default regenerateOtp;
