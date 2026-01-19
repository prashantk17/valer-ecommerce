import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        size: String,
        quantity: Number,

        // 👇 ADD THIS (VERY IMPORTANT)
        status: {
          type: String,
          enum: ["Order Placed", "Cancelled"],
          default: "Order Placed",
        },
      },
    ],

    address: {
      name: String,
      email: String,
      phone: String,
      country: String,
      countryCode: String,
      address: String,
      city: String,
      pincode: String,
    },

    pricing: {
      subtotal: Number,
      gst: Number,
      platformFee: Number,
      total: Number,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Stripe", "RAZORPAY"],
      default: "COD",
      required: true,
    },

    paymentInfo: {
      gateway: String,
      paymentId: String,
      orderId: String,
      signature: String,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    // KEEP order-level status (optional but useful)
    status: {
      type: String,
      default: "Order Placed",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
