import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI,{
        dbName:"taskbit_db",
        bufferCommands:true,
    })
    console.log("connected");
    
  } catch (error) {
    console.log("Error",error);
    throw new Error("Error connecting database")
  }
}

export default connectToDatabase;