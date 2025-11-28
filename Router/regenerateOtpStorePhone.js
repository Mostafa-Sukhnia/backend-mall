import { Router } from "express";
import generateOTP from "../lib/generateOtp.js";
import { prisma } from "../lib/prisma.js";
// import { sendTelegramOTP } from "../lib/telOtp.js";
const regenerateOtpStorePhone = Router();

regenerateOtpStorePhone.post("/", async (req, res) => {
  try {
    const { number } = req.body;
    const code = generateOTP();
    const store = await prisma.stores.findUnique({
      where: {
        phon_number: number,
      },
    });
    if (!store) {
      return res
        .status(400)
        .json({ message: "store not found your store phone number is not correct" });
    } else if (store.is_phone_verified === true) {
      return res.status(400).json({ message: "store phone number already verified" });
    } else {
      const updateStoreCode = await prisma.stores.update({
        where: {
          store_id: store.store_id,
        },
        data: {
          verified_phone_code: code,
        },
      });
      res
        .status(200)
        .json({ message: "code generated succsfuly", updateStoreCode });
    }
  } catch (error) {
    console.error("Regenerate OTP Phone Number error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default regenerateOtpStorePhone;
