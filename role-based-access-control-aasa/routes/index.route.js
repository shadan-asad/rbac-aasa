const router = require("express").Router();

// Default return for the root
router.get("/", (req, res, next) => {
  res.status(200).json({ home: "homepage" });
});

module.exports = router;
