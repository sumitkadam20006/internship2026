const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  let token = null;

  // Check token in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Check token in Authorization Header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;

    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  // No Token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save logged-in user info
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = requireAuth;