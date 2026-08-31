require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI in environment variables");
}

mongoose.set("strictQuery", false);

let isConnected = false;

const connectToMongo = async () => {
  if (isConnected) {
    return;
  }

  const options = {
    serverSelectionTimeoutMS: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS),
    connectTimeoutMS: Number(process.env.MONGO_CONNECT_TIMEOUT_MS),
    family: Number(process.env.MONGO_FAMILY),
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
