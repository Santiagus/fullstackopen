const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://admin:password@localhost:27017/fullstackopen?authSource=admin";

mongoose.set("strictQuery", false);

let isConnected = false;

const connectToMongo = async () => {
  if (isConnected) {
    return;
  }

  const options = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    family: 4,
  };

  try {
    await mongoose.connect(MONGO_URI, options);
    isConnected = true;
    console.log(`Mongo connected: ${MONGO_URI}`);
  } catch (error) {
    console.error("Mongo connection failed:", error.message);
    throw error;
  }
};

const disconnectMongo = async () => {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
  console.log("Mongo disconnected");
};

module.exports = {
  connectToMongo,
  disconnectMongo,
};
