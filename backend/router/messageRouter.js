import express from "express";
import {
  getAllMessages,
  sendMessage,
  replyMessage
} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);
router.post("/reply/:id", replyMessage);

export default router;
