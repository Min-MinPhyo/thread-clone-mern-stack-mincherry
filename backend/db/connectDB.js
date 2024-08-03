import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `mongose database connected successfully in ${process.env.PORT}`
    );
  } catch (error) {
    console.log(`error  ${error.message}`);
    process.exit(1);
  }
};


export default connectDB