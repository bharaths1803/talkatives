import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    let loggedinUserId = new mongoose.Types.ObjectId(req.user._id);
    const users = await User.find({
      _id: { $ne: loggedinUserId },
    }).select("-password");
    res.status(201).json({ users });
  } catch (error) {
    console.log(`Error in get users controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};
