import express from "express";
import {
  getSearchedUsers,
  getUsers,
  updateDescription,
  updateProfilePic,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/bulk", protectRoute, getSearchedUsers);
router.put("/update-profile-pic", protectRoute, updateProfilePic);
router.put("/update-description", protectRoute, updateDescription);
export default router;
