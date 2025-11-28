import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { verifyToken } from "../lib/auth.js";

const acceptStore = Router();

acceptStore.get("/",async (req, res) => {
  const { store_id } = req.body;
  const token = req.cookies.auth_token;
  const decodedobj = verifyToken(token);
  if (!decodedobj.valid) {
    res.status(401).json({ message: "Unauthorized" });
  }
  const admin = await prisma.users.findUnique({
    where: {
      user_id: decodedobj.decoded.userId,
    },
  });
  if (admin.UserRole !== "ADMIN") {
    res
      .status(401)
      .json({
        message:
          "Access denied — you do not have permission to access this resource.",
      });
  } else {
    const store = await prisma.stores.findUnique({
      where: {
        store_id,
      },
    });
    if (!store) {
      res.status(404).json({ message: "store not found!." });
    } else {
      res.status(200).json({ message: "your store is: ", store });
    }
  }
});

export default acceptStore;
