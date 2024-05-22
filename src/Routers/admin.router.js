import { Router } from "express";
import { getUserDetail,deleteUser,updateUser } from "../Controllers/admin.controller.js";
import { adminMiddleware } from "../middlewares/adminmiddleware.js";


const Adminrouter = Router();

Adminrouter.post('/admin/login',adminMiddleware);

Adminrouter.get('/admin/users/:userId',getUserDetail);
Adminrouter.delete('admin/users/:userId',deleteUser);
Adminrouter.put('/admin/users/:userId',updateUser);


export default Adminrouter;
