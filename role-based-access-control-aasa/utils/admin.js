const User = require("../models/user.model");

// Returns all users for admin
async function admin(res) {
  const users = await User.find();
  res.status(200).json({ all_users: users });
}

module.exports = admin;
