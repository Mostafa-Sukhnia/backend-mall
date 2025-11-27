import { Router } from "express";
import { generateToken } from "../lib/auth.js";
import { validateEmail, vallidatePassword } from "../lib/regEx.js";
import { prisma } from "../lib/prisma.js";
import { checkPassword } from "../lib/auth.js";
import { verifyToken } from "../lib/auth.js";
export const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for email:", email, password);
  try {
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: "Incorrect user name or password." });
    } else if (!vallidatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Incorrect user name or password." });
    } else {
      const user = await prisma.users.findUnique({
        where: { email },
      });
      const token = verifyToken(user.current_token);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      } else if (token.valid === true) {
        return res
          .status(401)
          .json({
            message:
              "There is already an active session. Please log out first.",
          });
      } else {
        const isPasswordValid = await checkPassword(password, user.password);
        if (!isPasswordValid) {
          return res
            .status(401)
            .json({ message: "Incorrect user name or password." });
        } else if (!user.is_verified) {
          return res
            .status(403)
            .json({
              message: "Account not verified. Please verify your account.",
            });
        }
        const token = generateToken({ userId: user.user_id });

        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 60 * 60 * 1000,
        });

        await prisma.users.update({
          where: {
            user_id: user.user_id,
          },
          data: {
            current_token: token,
          },
        });

        return res.status(200).json({
          success: true,
          message: "Login data received",
          data: {
            user,
          },
        });
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "server error" });
  }
});
