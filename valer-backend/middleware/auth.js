import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    console.log("🔐 AUTH MIDDLEWARE HIT");

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      console.log("❌ NO TOKEN");
      return res.status(401).json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("🔐 TOKEN DECODED:", decoded);

    req.user = { id: decoded.id };

    console.log("🔐 CALLING NEXT()");
    next(); // 👈 THIS IS CRITICAL
  } catch (error) {
    console.log("❌ AUTH ERROR:", error.message);
    return res.status(401).json({ success: false, message: "Auth failed" });
  }
};

export default authUser;
