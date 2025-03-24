import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  groupname: {
    type: string,
    required: true,
  },
  profilePicUrl: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
    default: "This group is...",
  },
  members: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  bannedUsers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  admins: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
