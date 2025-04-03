import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import Group from "../models/group.models.js";
import Message from "../models/message.model.js";
import { io } from "../lib/socket.js";

export const createGroup = async (req, res) => {
  try {
    const { members, groupname } = req.body;
    const loggedInUserId = req.user._id;
    members.push(loggedInUserId);
    const group = await Group.create({
      members,
      groupname,
      createdBy: loggedInUserId,
    });
    group.admins.push(loggedInUserId);
    await group.save();
    group.populate([
      {
        path: "createdBy",
        select: "-password",
      },
      {
        path: "admins",
        select: "-password",
      },
      {
        path: "members",
        select: "-password",
      },
    ]);
    const groupId = group._id;
    await User.updateMany(
      {
        _id: {
          $in: members,
        },
      },
      {
        $push: {
          groups: groupId,
        },
      }
    );
    res.status(201).json(group);
  } catch (error) {
    console.log("Error in create group controlller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const user = await User.findById(loggedInUserId)
      .populate({
        path: "groups",
        populate: [
          {
            path: "members",
            select: "-password",
          },
          {
            path: "createdBy",
            select: "-password",
          },
          {
            path: "admins",
            select: "-password",
          },
        ],
      })
      .lean();
    const groups = user.groups;
    res.status(200).json(groups);
  } catch (error) {
    console.log("Error in get groups controlller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addMembers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { members } = req.body;
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group.admins.includes(loggedInUserId)) {
      return res.status(401).json({
        message: "You can not perform this action",
      });
    }
    group.members = [...group.members, ...members];
    await group.save();
    await User.updateMany(
      {
        _id: {
          $in: members,
        },
      },
      {
        $push: {
          groups: groupId,
        },
      }
    );
    console.log("In add members", members);
    res.status(200).json(group);
  } catch (error) {
    console.log("Error in add members controlller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await Message.find({
      groupId,
    });
    res.status(201).json({ messages });
  } catch (error) {
    console.log(`Error in get messages controller`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { text, image } = req.body;
    let imageUrl;
    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }
    const senderId = req.user._id;
    const message = await Message.create({
      senderId,
      groupId,
      text,
      imageUrl,
    });
    await message.save();
    io.to(groupId).emit("newMessage", message);
    res.status(200).json({ message });
  } catch (error) {
    console.log(`Error in send messages controller`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const updateGroupDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const { groupId } = req.params;
    const loggedinUserId = req.user._id;
    const group = await Group.findById(groupId);
    if (!group.admins.includes(loggedinUserId)) {
      console.log(group.admins);
      console.log(loggedinUserId);
      return res.status(401).json({
        message: "You can not perform this action",
      });
    }
    group.description = description;
    await group.save();
    res.status(201).json({ group });
  } catch (error) {
    console.log(`Error in update group description controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const updatePhoto = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const { groupId } = req.params;
    const loggedinUserId = req.user._id;
    const group = await Group.findById(groupId);
    if (!group.admins.includes(loggedinUserId)) {
      return res.status(401).json({
        message: "You can not perform this action",
      });
    }
    const result = await cloudinary.uploader.upload(profilePic);
    const profilePicUrl = result.secure_url;
    group.profilePicUrl = profilePicUrl;
    await group.save();
    res.status(201).json({ group });
  } catch (error) {
    console.log(`Error in update profile controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate([
      {
        path: "members",
        select: "-password",
      },
      {
        path: "createdBy",
        select: "-password",
      },
    ]);
    res.status(200).json(group);
  } catch (error) {
    console.log("Error in get group by id controlller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const exitGroup = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { groupId } = req.params;
    await Promise.all([
      User.updateOne(
        {
          _id: loggedInUserId,
        },
        {
          $pull: {
            groups: groupId,
          },
        }
      ),
      Group.updateOne(
        {
          _id: groupId,
        },
        {
          $pull: {
            members: loggedInUserId,
            admins: loggedInUserId,
          },
        }
      ),
    ]);
    const group = await Group.findById(groupId);
    if (group.admins.length === 0) group.admins.push(group.members[0]);
    await group.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in exit group controlller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
