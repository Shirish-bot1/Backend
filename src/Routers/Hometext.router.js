import { Router } from "express";
import {  createTexts,  deleteTexts,  getTextByIds, getTexts,  updateTexts } from "../Controllers/Hometext.controller.js";

const router13 = Router();
 
 router13.post('admin/text',createTexts);
 router13.get('admin/text',getTexts);
 router13.get('admin/text/:textId',getTextByIds);
 router13.put('admin/text/:textId',updateTexts);
 router13.delete('admin/text/:textId',deleteTexts);

 export {router13};
