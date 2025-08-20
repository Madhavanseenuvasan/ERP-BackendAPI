const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res, next) => {
  const authheader = req.header("Authorization");
  const token = authheader && authheader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "token not provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decode.user || !decoded.user.id) {
      return res.status(401).json({ message: "invalid token payload" });
    }

    req.user = decoded.user;

    console.log("user id from token", req.user.id);
    next();
  } catch (error) {
    console.error("jwt verification failed:", req.user.id);
    return res.status(401).json({ message: "unauthorised entry" });
  }
};



 module.exports = authmiddleware;
