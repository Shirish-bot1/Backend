import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/users.controller.js";
import { adminMiddleware } from "../middlewares/adminmiddleware.js";
import { getUserDetail,deleteUser,updateUser,loginAdmin } from "../Controllers/admin.controller.js";
import { userAuth } from "../middlewares/userauthentication.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post('/admin/login',loginAdmin);

router.get('/admin/users/:userId',userAuth,getUserDetail);
router.delete('admin/users/:userId',userAuth,deleteUser);
router.put('/admin/users/:userId',userAuth,updateUser);


export { router };