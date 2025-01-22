import mongoose from "mongoose";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const loggedinUserId = req.user._id;
    const users = await User.find({
      _id: { $ne: loggedinUserId },
    }).select("-password");
    res.status(201).json({ users });
  } catch (error) {
    console.log(`Error in get users controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const getSearchedUsers = async (req, res) => {
  try {
    const { filter = "" } = req.query;
    const loggedinUserId = req.user._id;
    const users = await User.find({
      $and: [
        { username: { $regex: new RegExp(filter, "i") } },
        { _id: { $ne: loggedinUserId } },
      ],
    });
    res.status(201).json({ users });
  } catch (error) {
    console.log(`Error in get searched users controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};
