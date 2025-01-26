import cloudinary from "../lib/cloudinary.js";
import { getUserSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const { toChatUserId } = req.params;
    const currentUserId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: toChatUserId },
        { senderId: toChatUserId, receiverId: currentUserId },
      ],
    });
    res.status(201).json({ messages });
  } catch (error) {
    console.log(`Error in get messages controller`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { text, image } = req.body;
    let imageUrl;
    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }
    const senderId = req.user._id;
    const message = await Message.create({
      senderId,
      receiverId,
      text,
      imageUrl,
    });
    await message.save();
    const receiverSocketId = getUserSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }
    res.status(200).json({ message });
  } catch (error) {
    console.log(`Error in send messages controller`);
    res.status(500).json({ message: `Internal server error` });
  }
};
