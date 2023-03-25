//Este archivo se encarga de generar una especie de tabla para la base de datos de un post

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, //Elimina los espacios del inicio y final
  },
  description: {
    type: String,
    required: true,
    trim: true, //Elimina los espacios del inicio y final
  },
  image: {
    url: String,
    public_id: String, //El id que viene desde cloudinary
  },
});

export default mongoose.model("Post", postSchema);
