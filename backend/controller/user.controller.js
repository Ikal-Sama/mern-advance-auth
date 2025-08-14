import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateProfile = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    user.name = name;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in updateProfile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in updatePassword:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
