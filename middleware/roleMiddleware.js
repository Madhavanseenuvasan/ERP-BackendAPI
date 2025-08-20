const userModel = require('../models/userModel')


const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id);
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};

module.exports = authorizeRoles;