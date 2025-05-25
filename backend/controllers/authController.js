const User = require('../models/User');
const passport = require('passport');

const { registerValidation, loginValidation } = require('../utils/validators');

// Render login page
exports.getLogin = (req, res) => {
  res.render('auth/login', 
    { 
      title: 'Login'
    });
};

// Handle login
exports.postLogin = (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: info?.message || "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, message: "Login successful", user: { _id: user._id, username: user.username, isAdmin: user.isAdmin } });
    });
  })(req, res, next);
};

// Render register page
exports.getRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

// Handle registration
exports.postRegister = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const { username, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ success: false, message: "Username already exists" });
    }

    // Create new user
    user = new User({ username, password });
    await user.save();

    return res.json({ success: true, message: "Registration successful. Please log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.json({ success: true, message: "You have been logged out" });
  });
};