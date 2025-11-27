import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { verifyToken } from "../lib/auth.js";

const acceptidentityRouter = Router();

acceptidentityRouter.get("/:user_id", async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    const auth_token = req.cookies.auth_token;

    if (!verify.valid) return res.status(401).json({ message: "Unauthorized" });


    const verify = verifyToken(auth_token);
    if (!verify.valid) return res.status(401).json({ message: "Unauthorized" });


    const yourRole = await prisma.users.findUnique({
      where: { user_id: verify.userId },
      select: { UserRole: true },
    });

    if (yourRole?.UserRole !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    const identityImages = await prisma.users.findUnique({
      where: { user_id },
      select: {
        identity_image_front: true,
        identity_image_back: true,
        identity_verification_status: true,
      },
    });

    if (!identityImages) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: identityImages });
  } catch (error) {
    console.error("Error in acceptidentityRouter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

acceptidentityRouter.post("/:user_id", async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    const auth_token = req.cookies.auth_token;
    const { type_of_identity_verification_status } = req.body;

    if (!type_of_identity_verification_status)
      return res
        .status(400)
        .json({ message: "Send new state: VERIFIED or REJECTED" });

    if (!verify.valid) return res.status(401).json({ message: "Unauthorized" });


    const verify = verifyToken(auth_token);
    if (!verify.valid) return res.status(401).json({ message: "Unauthorized" });

    const yourRole = await prisma.users.findUnique({
      where: { user_id: verify.userId },
      select: { UserRole: true },
    });

    if (yourRole?.UserRole !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    const user = await prisma.users.findUnique({ where: { user_id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    else if (user.identity_verification_status === "VERIFIED") {
      return res
        .status(400)
        .json({ message: "Your account is already active" });
    }

    const dataToUpdate = {
      identity_verification_status: type_of_identity_verification_status,
      is_active: false,
      verified_at: null,
    };
    if (type_of_identity_verification_status === "VERIFIED") {
      dataToUpdate.is_active = true;
      dataToUpdate.verified_at = new Date();
    }

    const updatedUser = await prisma.users.update({
      where: { user_id },
      data: dataToUpdate,
    });

    res.status(200).json({
      message: "Identity verification status updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in acceptidentityRouter POST:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default acceptidentityRouter;
