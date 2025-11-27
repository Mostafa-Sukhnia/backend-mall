import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { verifyToken } from "../lib/auth.js";
import { upload } from "../lib/upload.js";

const askForIdentityImageVerifier = Router();

askForIdentityImageVerifier.post(
  "/",
  upload.fields([
    { name: "image_front_identity", maxCount: 1 },
    { name: "image_back_identity", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const verification = verifyToken(req.cookies.auth_token);
      if (!verification) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userRecord = await prisma.users.findUnique({
        where: { user_id: verification.userId },
      });

      if (!userRecord) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!userRecord.is_verified || !userRecord.is_phone_verified) {
        return res.status(403).json({
          error:
            "You must activate your account and verify your phone number before submitting identity verification.",
        });
      }

      const frontImage = req.files?.image_front_identity?.[0];
      const backImage = req.files?.image_back_identity?.[0];

      if (!frontImage || !backImage) {
        return res
          .status(400)
          .json({ error: "Both identity images are required." });
      }

      const frontImagePath = `/uploads/images/${frontImage.filename}`;
      const backImagePath = `/uploads/images/${backImage.filename}`;

      if (userRecord.identity_verification_status === "PENDING") {
        return res
          .status(400)
          .json({ error: "Identity verification is already pending." });
      }
      if (userRecord.identity_verification_status === "VERIFIED") {
        return res
          .status(400)
          .json({ error: "Identity is already verified." });
      }
      if (userRecord.identity_verification_status === "REJECTED") {
        return res.status(400).json({
          error: "Identity verification was rejected. Please contact support.",
        });
      }

      const updatedUser = await prisma.users.update({
        where: { user_id: verification.userId },
        data: {
          identity_image_front: frontImagePath,
          identity_image_back: backImagePath,
          identity_verification_status: "PENDING",
        },
      });

      const admins = await prisma.users.findMany({
        where: { UserRole: "ADMIN" },
        select: { user_id: true },
      });

      const notification = await prisma.notifications.create({
        data: {
          notification_type: "IDENTITY_VERIFICATION_REQUEST",
          title: "New Identity Verification Request",
          message: `User ${verification.userId} - ${userRecord.first_name} ${userRecord.last_name} submitted identity images.`,
          created_at: new Date(),
        },
      });

      await prisma.notifications_map_user.createMany({
        data: admins.map((admin) => ({
          user_id: admin.user_id,
          notification_id: notification.notification_id,
          created_at: new Date(),
        })),
      });

      return res.status(200).json({
        message: "Identity images submitted for verification",
        user: updatedUser,
        notification,
      });
    } catch (error) {
      console.error("Error in /askForIdentityImageVerifier:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default askForIdentityImageVerifier;
