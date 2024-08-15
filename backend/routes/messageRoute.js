import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import protectAuth from "../middleware/protectAuth.js";

const messageRoute = express.Router();

messageRoute.get("/:id", protectAuth, getMessages);
messageRoute.post("/send/:id", protectAuth, sendMessage);

export default messageRoute;
