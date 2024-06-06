import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password",
      });
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all Fields",
      });
    }
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await userModel.create({
      username,
      password,
    });
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide id",
      });
    }
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, password } = req.body;
    const newPass = await bcrypt.hash(password, 12);
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        username,
        password: newPass,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
