import { error } from "console";
import { photos } from "../models/photos.models.js";
import { upload } from "../middlewares/multer.js";


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
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      
      const { id } = req.params;
      console.log("id", id);
      
      const { title, url } = req.body;
      console.log("title and url", title, url);
      
      const file = req.file;
      console.log("file", file);
      
      try {
        const content = await photos.findByPk(id);
        console.log("imageid", content);
        
        if (!content) {
          return res.status(404).json({ error: "Photo not found" });
        }
        
        content.title = title;
        content.url = file ? `/uploads/${file.filename}` : url;
        
        await content.save();
        
        res.status(200).json({ message: "Successfully updated photo" });
      } catch (error) {
        console.error("Error updating photo", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
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