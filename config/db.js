const mongoose=require("mongoose")
require("dotenv").config()

const db = process.env.mongoUrl;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log("💾  ✔ MongoDB connected");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
