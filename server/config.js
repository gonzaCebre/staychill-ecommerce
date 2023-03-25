//Este archivo va a cargar las variables de entorno

//Este archivo se encarga de cargar las variables de entorno

import dotenv from "dotenv"; //Nos permite leer las variables de entorno
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT;
