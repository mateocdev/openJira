import mongoose from "mongoose";
import { env } from "process";

/**
 * @description: Connect to MongoDB
 * 0: Not connected
 * 1: Connected
 * 2: Connecting
 * 3: Disconnect
 */
const mongooConnection = {
  isConnect: 0,
};

export const connectToDatabase = async () => {

  const MONGODB_URI = env.MONGODB_URI || "";
  
  if (mongooConnection.isConnect !== 0) {
    console.log("Connect to database");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnect = mongoose.connections[0].readyState;
    if (mongooConnection.isConnect === 1) {
      console.log("Already connected");
      return;
    }
    await mongoose.disconnect();
  }
  mongoose.set("strictQuery", false);
  mongoose.connect(MONGODB_URI);
  (mongooConnection.isConnect = 1), console.log("New connection");
};

export const disconnectDatabase = async () => {
  if (mongooConnection.isConnect === 0) return;

  await mongoose.disconnect();
  console.log("Disconnect");
};
