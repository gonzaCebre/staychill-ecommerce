//Archivo principal que arranca el servidor
import app from "./app.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js";

connectDB(); //Conecta con la base de datos

app.listen(PORT); //Arranca el servidor
console.log("Server running in port ", PORT);
