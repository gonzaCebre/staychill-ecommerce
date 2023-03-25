//Este archivo se encarga de la conexion con la base de datos

import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js"; //Llama la variable de entorno

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI); //Conecta con la url de la base de datos
    console.log("Connected to " + db.connection.name); //db.connection.name devuelve el nombre de la base de daqtos
  } catch (error) {
    console.log(error);
  }
};
