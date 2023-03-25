//Este archivo se encarga de crear los controladores de las rutas

import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra"; //Permite manejar archivos del sistema

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(); //El comando '.find()' devuelve lo que haya guardado en esa coleccion
    return res.send(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body; //Recibe todo lo que se manda en el body de la peticion

    let image;

    if (req.files?.image) {
      //Si viene un file va a estar aca dentro. 'image' el es name que le diste al campo de la imagen en el form
      const result = await uploadImage(req.files.image.tempFilePath); //Llama a la funcion de cloudinary pasasndole el archivo temporal creado

      await fs.remove(req.files.image.tempFilePath); //Elimina el archivo temporal de nuestro proyecto

      image = {
        url: result.secure_url, //Es la direccion publica del archivo en cloudinary
        public_id: result.public_id, //Public_id permite manejar la imagen despues (eliminarla por ej)
      };
    }

    const newPost = new Post({ title, description, image }); //'new Post' permite crear un nuevo objeto usando como plantilla el modelo creado con mongoose

    await newPost.save(); //'save()' permite guardarlo en la base de datos

    return res.json(newPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id; //Recibe el id del documento a modificar
    const body = req.body;

    const updatedPost = await Post.findByIdAndUpdate(id, body, {
      new: true,
    }); //'findByIdAndUpdate()' es una funcion de mongoose que permite modificar un documento de la base de datos a partir de su id. '{new: true}' devuelve el nuevo documento modificado
    console.log(updatedPost);
    return res.send(updatedPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id); // 'findByIdAndDelete()' viene desde mongoose. 'postRemoved' retorna el documento eliminado

    if (!postRemoved) return res.sendStatus(404); //Si no devuelve un elemento quier decir que no existe un documento con ese id. 'sendStatus' permite responder con un codigo de estado. 404 es que no encontro la direccion

    if (postRemoved.image.public_id) {
      //Si esa publicacion tenia una imagen...
      await deleteImage(postRemoved.image.public_id); //Lo elimina de cloudinary
    }

    return res.sendStatus(204); //204 significa que todo salio bien
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.sendStatus(404);

    return res.json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
