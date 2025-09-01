import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected successfully => host:${connect.connection.host}`);
  } catch (error) {
    console.log(`Error While connecting to DB: ${error}`);
  }
};

export default dbConnect;
