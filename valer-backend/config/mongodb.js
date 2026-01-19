import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI =", process.env.MONGO_URI);

    mongoose.connection.on("connected", () => {
      console.log("DB Connected");
    });

    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
