import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

/* ---------------- ADD PRODUCT ---------------- */
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product images are required",
      });
    }

    // Upload images
    const images = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        return result.secure_url;
      }),
    );

    const parsedSizes = Array.isArray(sizes) ? sizes : sizes ? [sizes] : [];

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory: subCategory || "General",
      sizes: parsedSizes,
      bestSeller: bestseller === "true",
      images,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- LIST PRODUCTS ---------------- */
const listProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- REMOVE PRODUCT ---------------- */
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- SINGLE PRODUCT ---------------- */
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
