import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  updateProfile,
  updatePassword,
} from "../controller/user.controller.js";

const router = express.Router();

router.put("/update-profile", verifyToken, updateProfile);
router.put("/update-password", verifyToken, updatePassword);

export default router;
