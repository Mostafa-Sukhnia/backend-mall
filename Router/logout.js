import { Router } from "express";
import { verifyToken } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";

const logoutRouter = Router();
logoutRouter.post("/", async (req, res) => {
  try {
    const auth_token = req.cookies.auth_token;
    
    if (!auth_token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const decoded = verifyToken(auth_token);
    console.log("DECODED TOKEN:", decoded);

    if (!decoded || decoded.valid === false) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.decoded.userId;

    await prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        current_token: null,
      },
    });

    return res.json({ message: "Logged out successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error!" });
  }
});
export default logoutRouter;
