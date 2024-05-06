import { Router } from "express";
import { registerUser,loginUser } from "../src/Controllers/users.controller";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);


export { router };