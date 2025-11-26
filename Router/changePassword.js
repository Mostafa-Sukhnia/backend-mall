import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { checkPassword, hashPassword } from "../lib/auth.js";
const changePassword = Router();
changePassword.post("/", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      return res.status(401).json({ message: "Email is required" });
    } else if (!newPassword) {
      return res.status(401).json({ message: "password is required" });
    } else {
      const user = await prisma.users.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      } else {
        if (
          !user.password_reset_code_verified ||
          !user.password_reset_requested
        ) {
          return res
            .status(401)
            .json({ message: "You are not authorized to change password" });
        } else if (await checkPassword(newPassword, user.password)) {
          return res
            .status(400)
            .json({ message: "new password cannot be same as old password" });
        } else {
          const hashedNewPassword = await hashPassword(newPassword);
          await prisma.users.update({
            where: { user_id: user.user_id },
            data: {
              password: hashedNewPassword,
              password_reset_requested: false,
              password_reset_code_verified: false,
            },
          });
          return res
            .status(200)
            .json({ message: "password changed successfully" });
        }
      }
    }
  } catch (error) {
    console.error("Error in /change-password:", error);
    return res.status(500).json(error);
  }
});

export default changePassword;
