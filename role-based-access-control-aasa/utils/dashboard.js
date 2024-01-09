const User = require("../models/user.model");

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
