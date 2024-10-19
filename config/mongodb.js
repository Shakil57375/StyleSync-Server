import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connection established successfully");
    });
    
    await mongoose.connect(`${process.env.MONGODB_URI}/StyleSync`);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
