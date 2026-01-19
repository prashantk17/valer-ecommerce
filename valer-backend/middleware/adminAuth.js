import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  // 🔓 DEV BYPASS — ONLY FOR LOCAL TESTING
  if (process.env.NODE_ENV === "development") {
    console.log("⚠️ Admin auth bypassed (DEV MODE)");
    return next();
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Please login again",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ role-based check
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not Authorized, Please login again",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Please login again",
    });
  }
};

export default adminAuth;
