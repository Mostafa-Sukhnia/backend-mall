import express from "express";
import { PORT } from "./config/env.js";
import loginRouter from "./Router/login.js";

const app = express();

app.use(express.json());

app.use("/api/login", loginRouter);

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
