const User = require("../models/user.model");

// Returns the profile information for the particular user
async function dashboard(req, res, next) {
  let person = await User.findById(req.user.userId);
  person = {
    id: person._id,
    email: person.email,
    accessLevel: person.accessLevel,
  };
  res.status(200).json({ person });
}

module.exports = dashboard;
