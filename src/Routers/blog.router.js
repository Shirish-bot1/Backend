import express from 'express';
import { upload } from '../middlewares/multer.js';
import { uploadblog } from '../Controllers/blog.controller.js';


const router5 = express.Router();

router5.post('/blog',upload,uploadblog);


export{router5};