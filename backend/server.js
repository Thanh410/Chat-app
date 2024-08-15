import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const __dirname = path.resolve();
//app config
// const app = express();
const port = process.env.PORT || 5000;
//connect DB
//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("/", (req, res) => {
//   res.send("API working");
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
//routes
app.use("/api/auth", authRouter);
app.use("/api/message", messageRoute);
app.use("/api/user", userRouter);
server.listen(port, () => {
  connectDB();

  console.log(`Server started on http://localhost:${port}`);
});
