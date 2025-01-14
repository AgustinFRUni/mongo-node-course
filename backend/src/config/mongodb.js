// Mongo db connection
import mongoose from "mongoose"

export const connectDB = async (CONNECTION_STRING) => {
  try {
    await mongoose.connect(CONNECTION_STRING)
    console.log("Conexión a mongodb exitosa")
  } catch (error) {
    console.log("Conexión a mongodb rechazada")
  }
}
