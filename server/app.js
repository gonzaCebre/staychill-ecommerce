import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload"; //Modulo que nos permite subir imagenes
import postRoutes from "./routes/posts.routes.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express(); //Inicializa el servidor
const __dirname = dirname(fileURLToPath(import.meta.url)); //Esta linea de codigo nos da cual es la ruta raiz de todo el proyecto

//Middlewares
app.use(express.json()); //Permite entender los jsons
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true, //Cuando se suba la imagen, lo sube a una carpeta temporal dentro del proyecto para luego mandarlo a otro servicio
    tempFileDir: "./upload", //Estos archivos temporales los sube a esta carpeta
  })
);

//Rutas
app.use("/api", postRoutes); //Llama a las rutas

app.use(express.static(join(__dirname, "../client/build"))); //Esto permite que el server lea el front

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/build/index.html"));
}); //Esto permite que como la app se va a servir desde el backend, toda peticion pase por el front

export default app;
