import express from 'express';
import { createBook,deleteBook,getBooks, updatebook } from '../Controllers/book.controller.js';
import { upload } from '../middlewares/multer.js';
import { userAuth } from '../middlewares/userauthentication.js';

const router1 = express.Router();

router1.post('/books',userAuth,upload,createBook);
router1.get('/books',getBooks);
router1.delete('/books/:bookId',deleteBook)
router1.put('books/:bookId',updatebook)

export{router1};
