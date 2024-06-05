import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_DB_URI)
      .then(() => {
        console.log("Database connected 🚀");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
