function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userRole = req.user.role?.toLowerCase();
    const normalizedRoles = allowedRoles.map((role) => role.toLowerCase());

    if (!normalizedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }

    next();
  };
}

module.exports = authorizeRoles;
