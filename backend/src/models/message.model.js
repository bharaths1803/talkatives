import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Group",
  },
  text: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
