const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { roles } = require("../utils/constants");
const mongoose = require('mongoose');

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });

    // Username/email does NOT exist
    if (!user) {
      return res.status(401).json({ error: "Email not found" });
    }
    // Email exist and now we need to verify the password
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign(
      { userId: user._id, accessLevel: user.accessLevel },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    return res.status(400);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    const doesExist = await User.findOne({ email });
    if (doesExist) {
      return res.status(401).json({ error: "Username/email already exists" });
    }
    const user = new User(req.body);
    await user.save();
    res.status(200).json({ data: "Registered successfully!" });
  } catch (error) {
    next(error);
  }
});

router.patch("/update-level", async (req, res) => {
  try {
    const { id, accessLevel } = req.body;
    console.log(req.body);
    // Checking for id and roles in req.body
    if (!id || !accessLevel) {
      return res.status(401).json({ error: "Invalid request" });
    }

    // Check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(401).json({ error: "Invalid id" });
    }

    // Check for Valid role
    const rolesArray = Object.values(roles);
    if (!rolesArray.includes(accessLevel)) {
      return res.status(401).json({ error: "Invalid role selected" });
    }

    // Finally update the user
    await User.findByIdAndUpdate(
      id,
      { accessLevel },
      { new: true, runValidators: true }
    );

    res.status(200).json({ data: "Updated successfully!" });
  } catch (error) {
    return console.log(error);
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const email = req.query.email;
    console.log(req);
  
    if (!email) {
      return res.status(401).json({ error: "Invalid request" });
    }

    // Check if email exists
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // If it is an admin access level, it can't be deleted
    if(user.accessLevel === 'ADMIN') {
      return res.status(401).json({ error: "You can't delete admin" });
    }

    // Delete user
    await User.findByIdAndDelete(user._id);
   
    res.status(200).json({ data: "Deleted successfully!" });
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
