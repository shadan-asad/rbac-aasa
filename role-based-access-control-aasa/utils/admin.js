const User = require("../models/user.model");

// It returns all users for the /settings API
// Only accessible for 'admin'
async function admin(res) {
  const users = await User.find();
  res.status(200).json({ all_users: users });
}

module.exports = admin;
