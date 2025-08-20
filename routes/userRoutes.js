const express = require("express");
const {
  register,
  logIn,
  profile,
  updateProfile,
  deleteProfile,
  forgotPassword,
  resetPassword,
  updateUserStatus,
  logout,
  profileById,
} = require("../controllers/userController");
const authmiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(logIn);
router.route("/logout", authmiddleware).post(logout);
router.route("/reset/:token").post(resetPassword);
router.route("/forgot").post(forgotPassword);

router.route("/profile").get(profile);
router.route('/profile/:id').get(profileById)

router.route("/profile/:id").put(updateProfile);
router.route("/profile/:id/activate").put(updateUserStatus);

router.route("/profile/:id").delete(deleteProfile);

module.exports = router;
