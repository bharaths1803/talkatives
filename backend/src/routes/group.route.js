import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addMembers,
  createGroup,
  exitGroup,
  getGroupById,
  getGroups,
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

export default router;
