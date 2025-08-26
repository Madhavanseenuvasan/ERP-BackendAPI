const mongoose = require("mongoose");
const crypto = require("crypto");

const registerSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, unique: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["SuperAdmin", "Admin", "Manager", "Employee", "Client"],
      default: "Client",
    },
    phoneNumber: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
     loginLogs: [
    {
      loginTime: Date,
      logoutTime: Date,
    }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

registerSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 60 minutes

  return resetToken;
};

const registerModel = mongoose.model("Register", registerSchema);

module.exports = registerModel;