//Manages the relationship between data and provide schema validation

import mongoose from "mongoose";

//checking if you're connected
let isConnected = false;

const connectToDB = async()=>{
   mongoose.set('strictQuery', true); //'strict- shows errors'

   if(isConnected) {
    console.log("Using existing connection");
    return;
   }

   try {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "cyberTA"
    });
    isConnected = true;
    console.log("Connected to the database");
   } catch(error) {
        console.log("Error connecting to the database. Error:", error)
   }
}

export default connectToDB;