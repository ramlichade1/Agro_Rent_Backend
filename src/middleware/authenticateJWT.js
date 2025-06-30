const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "your-secret-key";
    const payload = jwt.verify(token, secret);

    console.log("✅ JWT Decoded:", payload);
    req.user = payload; // Add decoded user to request
    next();
  } catch (error) {
    console.error("❌ JWT verification failed:", error.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = authenticateJWT;
