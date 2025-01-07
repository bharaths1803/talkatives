import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: `All fields are required` });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: `Password must contain at least 6 characters` });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: `User already exists` });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).json({ message: `Invalid user data` });
    }
    const newUserId = newUser._id;
    await newUser.save();
    generateToken({ newUserId, res });
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.log(`Error in signup controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};
