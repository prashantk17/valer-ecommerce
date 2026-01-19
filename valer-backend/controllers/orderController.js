import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from "stripe";
console.log("🔑 STRIPE KEY:", process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = process.env.CURRENCY || "$";
/* =========================
   PLACE ORDER (COD)
========================= */
const placeOrder = async (req, res) => {
  console.log("🟢 PLACE ORDER API HIT");
  console.log("📨 REQUEST BODY:", req.body);
  console.log("👤 USER ID:", req.user?.id);

  try {
    const userId = req.user.id;
    const { cartData, address, pricing } = req.body;

    if (!cartData || cartData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const order = await orderModel.create({
      userId,
      items: cartData.map((item) => ({
        productId: item.id,
        size: item.size,
        quantity: item.quantity,
      })),
      address,
      pricing,
      paymentMethod: "COD",
      isPaid: false,
      status: "Order Placed",
    });

    // clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("❌ PLACE ORDER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   CANCEL ENTIRE ORDER
========================= */
const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.body;

    const order = await orderModel.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (!["Order Placed", "Packing"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage",
      });
    }

    order.status = "Cancelled";

    await order.save();

    return res.json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   USER ORDERS (FRONTEND)
========================= */
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel
      .find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("❌ USER ORDERS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   PLACEHOLDERS (SAFE)
========================= */
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartData, address, pricing } = req.body;

    console.log("🛒 STRIPE CART:", cartData);

    if (!cartData || cartData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const origin = req.headers.origin || "http://localhost:3000";

    const line_items = [];

    for (const item of cartData) {
      const product = await productModel.findById(item.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (!product.price) {
        return res.status(400).json({
          success: false,
          message: "Product price missing",
        });
      }

      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${origin}/verify?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment`,
      metadata: {
        userId,
        cartData: JSON.stringify(cartData),
        address: JSON.stringify(address),
        pricing: JSON.stringify(pricing),
      },
    });

    return res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("❌ STRIPE ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   VERIFY STRIPE PAYMENT
========================= */
const verifyStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({
        success: false,
        message: "Session ID missing",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const cartData = JSON.parse(session.metadata.cartData);
    const address = JSON.parse(session.metadata.address);
    const pricing = JSON.parse(session.metadata.pricing);

    const order = await orderModel.create({
      userId,
      items: cartData.map((item) => ({
        productId: item.id,
        size: item.size,
        quantity: item.quantity,
      })),
      address,
      pricing,
      paymentMethod: "Stripe",
      isPaid: true,
      status: "Order Placed",
    });

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({
      success: true,
      orderId: order._id,
    });
  } catch (error) {
    console.error("❌ VERIFY STRIPE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const placeOrderRazorpay = async (req, res) => {};
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("items.productId")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
/* =========================
   UPDATE ORDER STATUS (ADMIN)
========================= */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    return res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    console.error("❌ UPDATE STATUS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   EXPORTS (IMPORTANT)
========================= */
export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  cancelOrder,
};
