import mongoose from "mongoose"

mongoose.set('strictQuery', true)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
