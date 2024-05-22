import { Router } from "express";
import { delcomplain, getcomplain, getyourcomplain, registerComplain } from "../Controllers/complain.controller.js";





const router4 = Router();

router4.route("/complain").post(registerComplain);
router4.get("/user/complain",getcomplain);
router4.delete("/user/complain/:complainId",delcomplain);
router4.get("/user/complain/:complainId",getyourcomplain);

export{router4};
