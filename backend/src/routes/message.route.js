import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send/:receiverId", protectRoute, sendMessage);
router.get("/:toChatUserId", protectRoute, getMessages);

export default router;
