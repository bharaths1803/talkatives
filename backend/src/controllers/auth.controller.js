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
    }).select("-password");
    if (!newUser) {
      return res.status(400).json({ message: `Invalid user data` });
    }
    const newUserId = newUser._id;
    await newUser.save();
    generateToken({ newUserId, res });
    res.status(201).json({
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(`Error in signup controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: `All fields are required` });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: `Invalid user data` });
    }
    const userId = user._id;
    generateToken({ userId, res });
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(`Error in signup controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(`Error in check auth controller ${error}`);
    res.status(500).json({ message: `Internal server error` });
  }
};
