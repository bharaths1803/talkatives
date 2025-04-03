import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addMembers,
  createGroup,
  exitGroup,
  getGroupById,
  getGroupMessages,
  getGroups,
  getSearchedGroups,
  sendGroupMessage,
  updateGroupDescription,
  updatePhoto,
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createGroup);
router.get("/groups", protectRoute, getGroups);
router.put(
  "/update-group-description/:groupId",
  protectRoute,
  updateGroupDescription
);
router.put("/update-group-photo/:groupId", protectRoute, updatePhoto);
router.put("/add-members/:groupId", protectRoute, addMembers);
router.get("/get-group-by-id/:groupId", protectRoute, getGroupById);
router.delete("/exit-group/:groupId", protectRoute, exitGroup);
router.get("/bulk", protectRoute, getSearchedGroups);
router.post("/send/:groupId", protectRoute, sendGroupMessage);
router.get("/send/:groupId", protectRoute, getGroupMessages);

export default router;
