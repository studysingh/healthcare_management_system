import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";
import nodemailer from "nodemailer";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Sent!",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

// ✉️ Reply to a message and send email
export const replyMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { reply } = req.body;

  if (!reply) {
    return next(new ErrorHandler("Reply cannot be empty", 400));
  }

  const userMessage = await Message.findById(id);
  if (!userMessage) {
    return next(new ErrorHandler("Message not found", 404));
  }

  // Configure transporter (use your own email + app password)
  const transporter = nodemailer.createTransport({
    service: "gmail", // or "smtp"
    auth: {
      user: process.env.SMTP_MAIL, // your email
      pass: process.env.SMTP_PASSWORD, // app password
    },
  });
let messagePreview = userMessage.message
  ?.trim()
  .replace(/\s+/g, ' ')        // normalize whitespace
  .split(' ')
  .slice(0, 5)
  .join(' ');
  // Send email
  await transporter.sendMail({
    from: `"Admin" <${process.env.SMTP_MAIL}>`,
    to: userMessage.email,
    subject: `Reply regarding: ${messagePreview}...`,
    text: reply,
  });

  res.status(200).json({
    success: true,
    message: "Reply sent successfully via email",
  });
});
