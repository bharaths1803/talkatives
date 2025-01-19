import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const { toChatUserId } = req.body;
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
