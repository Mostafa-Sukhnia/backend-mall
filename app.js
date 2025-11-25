import express from "express";
import { PORT } from "./config/env.js";
import {loginRouter} from "./Router/login.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import signupRouter from "./Router/signup.js";
import verifyAccountRouter from "./Router/verifyAccount.js";
import regenerateOtp from "./Router/regenerateOtp.js"
import verifyPhonNumberRouter from "./Router/verifyPhonNumber.js";
import regenerateOtpPhoneNumber from "./Router/regenerateOtpPhone.js";
dotenv.config();
const app = express();
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/signup", signupRouter);
app.use("/api/v1/verify-account", verifyAccountRouter);
app.use("/api/v1/verify-phon-number", verifyPhonNumberRouter);
app.use("/api/v1/regenerate-otp", regenerateOtp);
app.use("/api/v1/regenerate-Otp-Phone-Number", regenerateOtpPhoneNumber);
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
