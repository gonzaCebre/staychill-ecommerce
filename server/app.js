import express from "express";
import cors from "cors";
import axios from "axios";
import fileUpload from "express-fileupload"; //Modulo que nos permite subir imagenes
import postRoutes from "./routes/posts.routes.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import mercadopago from "mercadopago";

const app = express(); //Inicializa el servidor

//Esta linea de codigo nos da cual es la ruta raiz de todo el proyecto
const __dirname = dirname(fileURLToPath(import.meta.url));

mercadopago.configure({
  access_token:
    "TEST-7005871603924729-031912-685fe69d8eecd41ee8fc79740ea9dfcd-206611814",
});

//Middlewares
/* app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false })); */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(join(__dirname, "../client/build")));
/* app.use(express.static("../client")); */
app.use(cors());
app.get("/", function (req, res) {
  res.status(200).sendFile("index.html");
});

app.use(
  fileUpload({
    useTempFiles: true, //Cuando se suba la imagen, lo sube a una carpeta temporal dentro del proyecto para luego mandarlo a otro servicio
    tempFileDir: "./upload", //Estos archivos temporales los sube a esta carpeta
  })
);

//Rutas
app.use(postRoutes); //Llama a las rutas

/* app.use(postRoutes); //Llama a las rutas */

//Esto permite que el server lea el front
/* app.use(express.static(join(__dirname, "../client/build")));  */

//Esto permite que como la app se va a servir desde el backend, toda peticion pase por el front
/* app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/build/index.html"));
}); */

export default app;
