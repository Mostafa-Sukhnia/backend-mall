import { Router } from "express";
import { upload } from "../lib/upload.js";
import { sendDevEmail } from "../lib/mail.js";
import generateOTP from "../lib/generateOtp.js";
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
  } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  } else if (!vallidatePassword(password)) {
    return res
      .status(400)
      .json({ message: "Password does not meet complexity requirements." });
  } else if (!validateUsername(first_name) || !validateUsername(last_name)) {
    return res
      .status(400)
      .json({ message: "Invalid first name or last name format." });
  } else if (!validateDateOfBirth(dateOfBirth)) {
    return res
      .status(400)
      .json({ message: "Invalid date of birth format. Use YYYY-MM-DD." });
  } else if (!req.file) {
    return res.status(400).json({ message: "Profile image is required." });
  } else if (!validatePhoneNumber(phone_number)) {
    return res.status(400).json({ message: "Invalid phone number format." });
  } else if (!validateLocation({ latitude, longitude, accuracy }).valid) {
    const { message } = validateLocation({ latitude, longitude, accuracy });
    return res.status(400).json({ message: `Location error: ${message}` });
  } else {
    const code = generateOTP();
    const filePath = `/uploads/images/${req.file.filename}`;
    await sendDevEmail(email, code);
    const hashedPassword = await hashPassword(password);

    const location = await prisma.location.create({
      data: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        accuracy: accuracy.toString(),
      },
    });
    const user = await prisma.users.create({
      data: {
        first_name,
        last_name,
        email,
        city_id: Number(city_id),
        village_id: Number(village_id),
        phone_number,
        password: hashedPassword,
        date_of_birth:dateOfBirth,
        profile_image: filePath,
        verified_code: code,
      },
    });
    const location_map_user = await prisma.location_map_user.create({
      data: {
        user_id: user.user_id,
        location_id: location.location_id,
        name_location: "home location",
      },
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        location,
        location_map_user,
      },
    });
  }
});

export default signupRouter;
