import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addMembers,
  createGroup,
  getGroups,
  makeAdmin,
  removeMember,
  updateGroupDescription,
  updateProfile,
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createGroup);
router.get("/groups", protectRoute, getGroups);
router.put(
  "/update-group-description/:groupId",
  protectRoute,
  updateGroupDescription
);
router.put("/add-members", protectRoute, addMembers);
router.put("/make-admin", protectRoute, makeAdmin);
router.delete("/remove-member", protectRoute, removeMember);

export default router;
