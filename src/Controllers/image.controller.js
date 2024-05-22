import { error } from "console";
import { photos } from "../models/photos.models.js";


 const uploadImage = async(req,res)=>{
     try{
        const{title} =req.body;
        const file = req.file;
        if(!file){
            return res.status(201).json({message:"url of image is required"})
        }
        const image = await photos.create({title:title,
            url:`/uploads/${file.filename}`,
            
        });
        console.log("Image saved to database:", image);
        res.status(201).json(image);


     }catch(error){
         res.status(400).json({message:"Internal server"});
     }

 }
 const getImages = async (req, res) => {
    try {
      const images = await photos.findAll();
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
   
 const getImagebyid = async (req, res) => {
    try {
      const { id } = req.params;
      const image = await photos.findByPk(id);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.status(200).json(image);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateImage = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, url } = req.body;
      const image = await photos.findByPk(id);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      image.title = title;
      image.url = url;
      await image.save();
      res.status(200).json(image);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteImage = async (req, res) => {
    try {
      const { id } = req.params;
      const image = await photos.findByPk(id);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      await image.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export { uploadImage,getImages, updateImage, deleteImage, getImagebyid};