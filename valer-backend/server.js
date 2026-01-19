import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- INIT SERVICES ---------------- */
// Important: run only once
let isInitialized = false;

const initServices = async () => {
  if (isInitialized) return;
  await connectDB();
  await connectCloudinary();
  isInitialized = true;
};

// initialize once at import time
await initServices();

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is live" });
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

/* ---------------- EXPORT (NO LISTEN) ---------------- */
export default app;
