import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, profileImage, role } =
      req.body;

    if (!name || !email || !password || !confirmPassword || !profileImage) {
      return res.send({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ success: false, message: "Already registered. Please login." });
    }

    const hashedPassword = await hashPassword(password);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      profileImage,
      role: role || 0,
    });

    // Optionally generate JWT token
    const token = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered. Please register first.",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Include `isVerified` in the response
    const token = JWT.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

export const getUserDetailsController = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    const user = await userModel.findOne({ email }).select("-password");

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user details",
      error: error.message,
    });
  }
};

export const updateUserDetailsController = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    const { address, age, profileImage } = req.body; // Extracting data from the request body

    // Validate inputs
    if (age && age < 0) {
      return res.status(400).json({ error: "Age must be a positive number." });
    }

    // Find the user by email and update the details
    const updatedUser = await userModel.findOneAndUpdate(
      { email }, // Find user by email
      {
        ...(address && { address }),
        ...(age && { age }),
        ...(profileImage && { profileImage }),
      },
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      message: "User details updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      error: "An error occurred while updating user details.",
    });
  }
};

export const changePasswordController = async (req, res) => {
  try {
    const { email } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare old password
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect old password." });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Password Change Error:", error);
    res.status(500).json({
      error: "An error occurred while changing the password.",
    });
  }
};
