import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/", (_req, res) => {
  res.json({ message: "Login route working (GET)" });
});

loginRouter.post("/", (req, res) => {
  const { email, password } = req.body;

  res.json({
    success: true,
    message: "Login data received",
    data: { email, password },
  });
});

export default loginRouter;
