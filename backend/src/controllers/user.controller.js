import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getUserSocketId, io } from "../lib/socket.js";

export const getUsers = async (req, res) => {
  try {
    const loggedinUserId = req.user._id;
    const users = await User.find({
      _id: { $ne: loggedinUserId },
    }).select("-password");
    console.log(users);
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

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, description } = req.body;
    const loggedinUserId = req.user._id;
    let profilePicUrl;
    if (profilePic) {
      const result = await cloudinary.uploader.upload(profilePic);
      profilePicUrl = result.secure_url;
    }
    const updatedUser = await User.findByIdAndUpdate(
      loggedinUserId,
      {
        profilePicUrl,
        description,
      },
      { new: true }
    );
    res.status(201).json({ user: updatedUser });
  } catch (error) {
    console.log(`Error in update profile controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const blockOrUnblockUser = async (req, res) => {
  try {
    const { toBlockOrUnBlockUserId } = req.params;
    const { block } = req.body;
    const loggedinUserId = req.user._id;
    const user = await User.findById(loggedinUserId);
    if (block && !user.blockedUsers.includes(toBlockOrUnBlockUserId)) {
      user.blockedUsers.push(toBlockOrUnBlockUserId);
    } else if (!block && user.blockedUsers.includes(toBlockOrUnBlockUserId)) {
      const toBlockOrUnBlockUserIdx = user.blockedUsers.indexOf(
        toBlockOrUnBlockUserId
      );
      user.blockedUsers.splice(toBlockOrUnBlockUserIdx, 1);
    }
    await user.save();
    const toBlockOrUnBlockUserSocketId = getUserSocketId(
      toBlockOrUnBlockUserId
    );
    if (toBlockOrUnBlockUserSocketId) {
      io.to(toBlockOrUnBlockUserSocketId).emit("block-or-unblock", user);
    }
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(`Error in block user controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};
