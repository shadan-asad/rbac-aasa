const admin = require("./admin");
const dashboard = require("./dashboard");

function checkAccessLevel(req, res, next) {
  const accessLevel = req.user.accessLevel;
  
  // Check access based on routes
  if (req.path === "/dashboard") {
    return dashboard(req, res); // Allow dashboard access to all 'user'
  } else if (req.path === "/statistics" && accessLevel === "MODERATOR") {
    return res.status(200).json({ access: "allowed" }); // Allow statistics access to 'moderator'
  } else if (req.path === "/settings" && accessLevel === "ADMIN") {
    return admin(res);  // Allow settings access to only 'admin'
  }

  return res.status(403).send("Access denied."); // Deny access for other cases
}

module.exports = checkAccessLevel;
