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

export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { text } = req.body;
    const senderId = req.user._id;
    const message = await Message.create({
      senderId,
      receiverId,
      text,
    });
    await message.save();
    res.status(200).json({ message });
  } catch (error) {
    console.log(`Error in send messages controller`);
    res.status(500).json({ message: `Internal server error` });
  }
};
