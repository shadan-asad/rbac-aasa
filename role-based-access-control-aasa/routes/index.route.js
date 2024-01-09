const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ home: "homepage" });
});

module.exports = router;
