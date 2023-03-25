import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  //Te permite configurar tus credenciales para poder conectarte
  cloud_name: "dpaxljhpr",
  api_key: "937433437586494",
  api_secret: "lWVTdAEeANeC_sWtBceSvQ-Qse4",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
  //'cloudinary.uploader.upload' es un comando de cloudinary que te permite subir archivos. El primer parametro es el filepath, el segundo la carpeta de cloudinary donde se va a subir
};

export const deleteImage = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};
