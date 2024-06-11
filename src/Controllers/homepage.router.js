
import express from 'express';
import { upload } from '../middlewares/multer.js';
import { createHomePhoto,getAllHomePhotos,updateHomePhoto,deleteHomePhoto } from './homepagephoto.js';
const router12 = express.Router()

router12.post('/photos',upload, createHomePhoto);
router12.get('/photos',getAllHomePhotos);

router12.put('/photos/:id',updateHomePhoto);
router12.delete('/photos/:id', deleteHomePhoto);

export{router12}