import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicUrl: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
      default: "I am ...",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
