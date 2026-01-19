import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/add", adminAuth, upload.array("images", 10), addProduct);

productRouter.get("/list", listProducts);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);

export default productRouter;
