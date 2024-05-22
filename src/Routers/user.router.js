import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/users.controller.js";
import { adminMiddleware } from "../middlewares/adminmiddleware.js";
import { getUserDetail,deleteUser,updateUser,loginAdmin } from "../Controllers/admin.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post('/admin/login',loginAdmin);

router.get('/admin/users/:userId',getUserDetail);
router.delete('admin/users/:userId',deleteUser);
router.put('/admin/users/:userId',updateUser);


export { router };