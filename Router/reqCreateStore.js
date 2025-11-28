import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { upload } from "../lib/upload.js";
import generateOTP from "../lib/generateOtp.js";
import { verifyToken } from "../lib/auth.js";

const reqCreateStore = Router();

reqCreateStore.post("/", upload.single("image"), async (req, res) => {
  try {
    // === 1) Verify token ===
    const auth_token = req.cookies.auth_token;
    const decoded_token = verifyToken(auth_token);

    if (!decoded_token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
const user = await prisma.users.findUnique({
    where:{
        user_id:decoded_token.decoded.userId
    }
})
    // === 2) Prepare image path ===
    const filePath = req.file
      ? `/uploads/images/${req.file.filename}`
      : "http://localhost:5500/uploads/images/defaultStore.jpg";

    // === 3) Validate input ===
    const { store_name, store_description, phon_number } = req.body;

    if (!store_name || !store_description || !phon_number) {
      return res.status(403).json({ message: "All fields are required" });
    }

    const phon_code = generateOTP();

    // === 4) Get admins ===
    const admins = await prisma.users.findMany({
      where: { UserRole: "ADMIN" },
      select: { user_id: true },
    });

    // === 5) Create store ===
    const storeRecord = await prisma.stores.create({
      data: {
        store_name,
        store_description,
        phon_number,
        logo_image: filePath,
        verified_phone_code: phon_code,
      },
    });

    // === 6) Create notification ===
    const notification = await prisma.notifications.create({
      data: {
        notification_type: "accept_create_store_request",
        title: "New Request to Create a Store",
        message: `The user ${user.user_id} - ${user.first_name} ${user.last_name} requested to create a store.`,
        created_at: new Date(),
      },
    });

    // === 7) Assign notification to admins ===
    await prisma.notifications_map_user.createMany({
      data: admins.map((admin) => ({
        user_id: admin.user_id,
        notification_id: notification.notification_id,
        created_at: new Date(),
      })),
    });

    // === 8) Final response ===
    return res.status(201).json({
      message: "Store request submitted successfully",
      store: storeRecord,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

export default reqCreateStore;
