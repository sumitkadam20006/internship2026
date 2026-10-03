const router = require("express").Router();

const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");
const auth = require("../middleware/auth");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function token(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const exists = await User.findOne({
      email: email.toLowerCase()
    });

    if (exists) {
      return res.status(409).json({
        message: "Email is already registered"
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      token: token(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
});


// =========================
// NORMAL LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: (email || "").toLowerCase()
    });

    if (
      !user ||
      !(await user.matchPassword(password || ""))
    ) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.json({
      token: token(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
});


// =========================
// GOOGLE LOGIN
// =========================
router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required"
      });
    }

    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email) {
      return res.status(401).json({
        message: "Invalid Google account"
      });
    }

    // Google must confirm the email
    if (!payload.email_verified) {
      return res.status(401).json({
        message: "Google email is not verified"
      });
    }

    const googleId = payload.sub;
    const email = payload.email.toLowerCase();

    // Find existing user by Google ID OR email
    let user = await User.findOne({
      $or: [
        { googleId },
        { email }
      ]
    });

    // Create new Google user
    if (!user) {
      user = await User.create({
        name: payload.name || email.split("@")[0],
        email,
        googleId,
        avatar: payload.picture || ""
      });
    } else {
      // Link Google account to existing email account
      let changed = false;

      if (!user.googleId) {
        user.googleId = googleId;
        changed = true;
      }

      if (!user.avatar && payload.picture) {
        user.avatar = payload.picture;
        changed = true;
      }

      if (!user.name && payload.name) {
        user.name = payload.name;
        changed = true;
      }

      if (changed) {
        await user.save();
      }
    }

    // Return our normal JWT
    res.json({
      token: token(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });

  } catch (e) {
    console.error("Google authentication error:", e);

    res.status(401).json({
      message: "Google authentication failed"
    });
  }
});


// =========================
// CURRENT USER
// =========================
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }
  });
});


module.exports = router;