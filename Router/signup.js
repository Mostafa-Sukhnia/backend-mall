import { Router } from "express";
import { upload } from "../lib/upload.js";
import { sendDevEmail } from "../lib/mail.js";
import generateOTP from "../lib/generateOTP.js";
import { hashPassword } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";

import {
  validateEmail,
  vallidatePassword,
  validateUsername,
  validateDateOfBirth,
  validatePhoneNumber,
  validateLocation,
} from "../lib/regEx.js";

const signupRouter = Router();

signupRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      dateOfBirth,
      city_id,
      village_id,
      phone_number,
      latitude,
      longitude,
      accuracy,
      UserRole,
      gender,
    } = req.body;

    // التحقق من صحة البيانات
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    if (!vallidatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password does not meet complexity requirements." });
    }
    if (!validateUsername(first_name) || !validateUsername(last_name)) {
      return res
        .status(400)
        .json({ message: "Invalid first name or last name format." });
    }
    if (!validateDateOfBirth(dateOfBirth)) {
      return res
        .status(400)
        .json({ message: "Invalid date of birth format. Use YYYY-MM-DD." });
    }
    if (!validatePhoneNumber(phone_number)) {
      return res.status(400).json({ message: "Invalid phone number format." });
    }
    if (!validateLocation({ latitude, longitude, accuracy }).valid) {
      const { message } = validateLocation({ latitude, longitude, accuracy });
      return res.status(400).json({ message: `Location error: ${message}` });
    }

    // إنشاء الأكواد المولدة
    const code = generateOTP();
    const phone_code = generateOTP();

    // الصورة: إذا لم يرسل المستخدم صورة استخدم الافتراضية
    const filePath = req.file
      ? `/uploads/images/${req.file.filename}`
      : "http://localhost:5500/uploads/images/defaultUser.png";

    // تشفير الباسورد
    const hashedPassword = await hashPassword(password);

    // إنشاء الموقع
    const location = await prisma.location.create({
      data: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        accuracy: accuracy.toString(),
      },
    });

    // إنشاء المستخدم
    const user = await prisma.users.create({
      data: {
        first_name,
        last_name,
        email,
        city_id: Number(city_id),
        village_id: Number(village_id),
        phone_number,
        verified_phone_code: phone_code,
        password: hashedPassword,
        date_of_birth: dateOfBirth,
        profile_image: filePath,
        verified_code: code,
        UserRole,
        gender,
      },
    });

    // ربط الموقع بالمستخدم
    const location_map_user = await prisma.location_map_user.create({
      data: {
        user_id: user.user_id,
        location_id: location.location_id,
        name_location: "home location",
      },
    });

    // إرسال البريد التجريبي
    await sendDevEmail(email, code);

    // الرد على العميل
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        location,
        location_map_user,
      },
    });
  } catch (error) {
    console.error("Error in signupRouter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default signupRouter;
