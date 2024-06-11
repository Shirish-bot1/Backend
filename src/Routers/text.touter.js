import express from 'express';
import { createText,deltext,updatetext,gettextId, getAllText } from '../Controllers/text.controller.js';

const router8 = express.Router();

router8.post('/text',createText);
router8.get('/admin/text/:id',gettextId);
router8.get('/admin/text/',getAllText);

router8.put('/admin/text/:id',updatetext);
router8.delete('/admin/text/:id',deltext);

export{router8}