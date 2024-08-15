import express from "express";
import { getUsersForSidebar } from "../controllers/userController.js";
import protectAuth from "../middleware/protectAuth.js";

const userRouter = express.Router();

userRouter.get("/", protectAuth, getUsersForSidebar);

export default userRouter;
