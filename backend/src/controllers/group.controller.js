import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import Group from "../models/group.models.js";

export const createGroup = async (req, res) => {
  try {
    const { members, groupname } = req.body;
    const loggedInUserId = req.user._id;
    const group = await Group.create({
      members,
      groupname,
    });
    group.admins.push(loggedInUserId);
    await group.save();
    const groupId = group._id;
    await User.updateMany(
      {
        _id: {
          $in: members,
        },
      },
      {
        $push: {
          groups: {
            groupId,
          },
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
        populate: {
          path: "members",
          select: "-password",
        },
      })
      .lean();
    const groups = user.groups;
    res.status(200).json(groups);
  } catch (error) {
    console.log("Error in get groups controlller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
