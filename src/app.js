import express from "express";
import cors from "cors";
import { router } from "./Routers/user.router.js";
import cookieParser from "cookie-parser";
import { registerUser } from "./Controllers/users.controller.js";
import { getUserDetail,deleteUser,updateUser,loginAdmin} from "./Controllers/admin.controller.js";
import { router1 } from "./Routers/book.router.js";
import { createBook,getBooks,deleteBook, updatebook } from "./Controllers/book.controller.js";
import { upload } from "./middlewares/multer.js";

import { router2 } from "./Routers/image.router.js";
import { deleteImage, getImagebyid, getImages, updateImage, uploadImage } from "./Controllers/image.controller.js";
import { router4 } from "./Routers/complain.router.js";
import { delcomplain, getcomplain, getyourcomplain, registerComplain } from "./Controllers/complain.controller.js";
import { router5 } from "./Routers/blog.router.js";
import { uploadblog } from "./Controllers/blog.controller.js";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: "500kb" })); 

// Routes
app.use("/api/v1", router); 
app.post("/api/v1/users/register", registerUser); 
// AdminRoutes
app.get("/api/v1/admin/users", getUserDetail);
app.delete("/api/v1/admin/users/:userId", deleteUser);
app.put("/api/v1/admin/users/:userId", updateUser);
app.post("/api/v1/admin/login", loginAdmin);
//bookroutes
app.use("/api/v2",router1)
app.get("/api/v2/books/", getBooks);
app.delete("/api/v2/books/:bookId", deleteBook);
app.post("/api/v2/books", upload,createBook);
app.put("/api/v2/books/:bookId",updatebook)
app.use('/uploads', express.static('uploads'));
//images Routes
app.use("/api/v3",router2)
app.post("/api/v3/images",upload,uploadImage);
app.get("/api/v3/images",getImages);
app.get("/api/v3/images",getImagebyid);
app.delete("/api/v3/images",deleteImage);
app.put("/api/v3/images",updateImage);
//complain router
app.use("/api/v4",router4)
app.post("/api/v4/complain",registerComplain);
app.get("/api/v4/user/complain",getcomplain);
app.delete("/api/v4/user/complain/:complainId",delcomplain);
app.get("/api/v4/user/complain/:complainId",getyourcomplain);

//blog router
app.use("/api/v5",router5);
app.post("/api/v5/blog",upload,uploadblog);












export { app };
