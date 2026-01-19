import userModel from "../models/userModel.js";

/* =========================
   ADD TO CART
========================= */
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { productId, size, quantity = 1 } = req.body;

    if (!productId || !size) {
      return res.json({
        success: false,
        message: "Product ID and size are required",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cartData) {
      user.cartData = {};
    }

    // Init product
    if (!user.cartData[productId]) {
      user.cartData[productId] = {};
    }

    // Init size
    if (!user.cartData[productId][size]) {
      user.cartData[productId][size] = 0;
    }

    // Update quantity
    user.cartData[productId][size] += quantity;

    // Cleanup
    if (user.cartData[productId][size] <= 0) {
      delete user.cartData[productId][size];
    }

    if (Object.keys(user.cartData[productId]).length === 0) {
      delete user.cartData[productId];
    }

    user.markModified("cartData");
    await user.save();

    console.log("🛒 CART DATA AFTER UPDATE:", user.cartData);

    res.json({
      success: true,
      message: "Added to cart",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   UPDATE CART
========================= */
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, quantity } = req.body;

    const user = await userModel.findById(userId);

    if (!user || !user.cartData?.[productId]?.[size]) {
      return res.json({
        success: false,
        message: "Item not found",
      });
    }

    if (quantity <= 0) {
      delete user.cartData[productId][size];

      if (Object.keys(user.cartData[productId]).length === 0) {
        delete user.cartData[productId];
      }
    } else {
      user.cartData[productId][size] = quantity;
    }

    await user.save();

    res.json({
      success: true,
      message: "Cart updated successfully",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET USER CART
========================= */
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    res.json({
      success: true,
      cartData: user?.cartData || {},
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, updateCart, getUserCart };
