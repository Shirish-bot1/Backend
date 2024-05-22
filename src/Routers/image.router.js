import express from 'express';
import { upload } from "../middlewares/multer.js";
import { uploadImage,getImages,getImagebyid,updateImage,deleteImage } from "../Controllers/image.controller.js";

 const router2 = express.Router();
 router2.post("/images", upload, uploadImage);
router2.get("/images", getImages);
router2.get("/images/:id", getImagebyid);
router2.put("/images/:id", updateImage);
router2.delete("/images/:id", deleteImage);

export{router2};