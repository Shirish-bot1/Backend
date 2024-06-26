import express from 'express';
import { upload } from '../middlewares/multer.js';
import { deleteBlog, getblog, getblogId, updateBlog, uploadblog } from '../Controllers/blog.controller.js';


const router5 = express.Router();

router5.post('/blog',upload,uploadblog);
router5.get('/blog',getblog);
router5.get('/blog/:blogId',getblogId);
router5.put('/blog/:blogId',upload,updateBlog);
router5.delete('/blog/:blogId',deleteBlog);


export{router5};