const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const sendEmail = require("../config/mailConfig");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { error } = require("console");

// REGISTER
const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      role,
      phonenumber,
      isActive = true,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !role ||
      !phonenumber
    ) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      role,
      phonenumber,
      isActive,
      loginLogs: [],
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are mandatory" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Log login time

    user.loginLogs.push({ loginTime: new Date() });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", accessToken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGOUT

const logout = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log("User ID from token:", userId);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User login logs:", user.loginLogs);

    if (!user.loginLogs || user.loginLogs.length === 0) {
      return res.status(400).json({ message: "No login sessions recorded" });
    }

    const lastLog = user.loginLogs[user.loginLogs.length - 1];

    if (lastLog.logoutTime) {
      return res.status(400).json({ message: "User already logged out" });
    }

    lastLog.logoutTime = new Date();
    await user.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// GET  All PROFILES

const profile = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({ users });
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  const updated = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updated });
};

// DELETE PROFILE

const deleteProfile = async (req, res) => {
  const deleted = await userModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ deleted });
};

// FORGOT PASSWORD

const forgotPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/users/reset/${resetToken}`;


    
    const message = `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 10 minutes.</p>`;

    await sendEmail(user.email, "Password Reset", message);

    res.status(200).json({ message: "Reset email sent", resetUrl });
  } catch (error) {
    res.status(500).json({ error: "Email failed to send" });
  }
};

// RESET PASSWORD

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const password = req.body.password;

    if (!token || !password)
      return res.status(400).json({ error: "Token and password are required" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ error: "Token is invalid or expired" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE USER STATUS

const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ error: "isActive must be true or false" });
    }

    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      message: `User has been ${isActive ? "activated" : "deactivated"}`,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const profileById = async(req, res)=>{
  const user = await  userModel.findById(req.params.id);
  res.status(200).json({user})
  if (!user) {
    res.status(404).json({error:error.message})
  }
}

module.exports = {
  register,
  logIn,
  logout,
  profile,
  profileById,
  updateProfile,
  deleteProfile,
  forgotPassword,
  resetPassword,
  updateUserStatus,
};
