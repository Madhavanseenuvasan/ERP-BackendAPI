const bcrypt = require('bcrypt');
const User=require('../models/userModel')
const register = require('../models/registerModel')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail=require('../config/mailConfig')


exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      emailId,
      password,
      role,
      phoneNumber,
      isActive = true,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !userName ||
      !emailId ||
      !password ||
      !role ||
      !phoneNumber
    ) {
      return res.status(400).json({ message: "All fields are mandatory." });
    }

    const existingUser = await register.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await register.create({
      firstName,
      lastName,
      userName,
      emailId,
      password: hashedPassword,
      role,
      phoneNumber,
      isActive,
    });

    res.status(201).json({ message: "User registered successfully" , user:newUser});
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const user = await register.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", accessToken: token });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};



exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,        
      sameSite: "Strict",  
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
    try {
    const token = req.params.token;
    const password = req.body.password;

    if (!token || !password)
      return res.status(400).json({ error: "Token and password are required" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await register.findOne({
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


exports.forgotPassword = async (req, res) => {
  try {
    const { emailId } = req.body;

    if (!emailId) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await register.findOne({ emailId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get("host")}/api/users/resetpassword/${resetToken}`;

    const message = `
      <p>You requested a password reset</p>
      <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
      <p>This link expires in 10 minutes.</p>
    `;
    await sendEmail(user.emailId, "Password Reset", message);

    res.status(200).json({ message: "Reset email sent", resetUrl });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ error: "Email failed to send" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users (with optional filters)
exports.getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.role) filter.userRole = req.query.role;
    if (req.query.email) filter.emailAddress = req.query.email;
    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
