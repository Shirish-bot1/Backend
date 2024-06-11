import express from "express";
import axios from "axios";
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
import { deleteBlog, getblog, getblogId, updateBlog, uploadblog } from "./Controllers/blog.controller.js";
import { paymentRouter } from "./Routers/khalti.router.js";
import { router8 } from "./Routers/text.touter.js";
import { createText, deltext, getAllText, gettextId, updatetext } from "./Controllers/text.controller.js";
import { router10 } from "./Routers/donationRoutes.js";
import { createDonation, deleteDonation, generateDonationReports, getAllDonations, updateTrackingStatus } from "./Controllers/DonationItemcontroller.js";
import { router11 } from "./Routers/donationpay.router.js";
import { deleteDonationpay, getAllDonationspay, getDailyDonationspay, getHighestDonorpay, getTotalDonationspay } from "./Controllers/donate.manipu.js";
import { router12 } from "./Controllers/homepage.router.js";
import { createHomePhoto,getAllHomePhotos,deleteHomePhoto,updateHomePhoto } from "./Controllers/homepagephoto.js";





const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: "500kb" })); 
app.use('/uploads', express.static('uploads'));

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

//images Routes
app.use("/api/v3",router2)
app.post("/api/v3/images",upload,uploadImage);
app.get("/api/v3/images",getImages);
app.get("/api/v3/images/:id",getImagebyid);
app.delete("/api/v3/images/:id",deleteImage);
app.put("/api/v3/images/:id",updateImage);
//complain router
app.use("/api/v4",router4)
app.post("/api/v4/complain",registerComplain);
app.get("/api/v4/user/complain",getcomplain);
app.delete("/api/v4/user/complain/:complainId",delcomplain);
app.get("/api/v4/user/complain/:complainId",getyourcomplain);

//blog router
app.use("/api/v5",router5);
app.post("/api/v5/blog",upload,uploadblog);
app.get("api/v5/blog",getblog);
app.get("/api/v5/blog/:blogId",getblogId);
app.put("api/v5/blog/:blogId",updateBlog);
app.delete("/api/v5/blog/:blogId",deleteBlog);


//Donation
app.use('/api/v7', paymentRouter);


//text
app.use('/api/v8',router8)
app.post("/api/v8/text",createText);
app.get("/api/v8/admin/text/:id",gettextId);
app.get("/api/v8/admin/text/",getAllText);
app.delete("/api/v8/admin/text/:id",deltext);
app.put("/api/v8/admin/text/:id",updatetext)
//itmedonation
app.use('/api',router10)
app.get('/api/donations', getAllDonations); // GET all donation items
app.post('/api/donations/create',upload, createDonation); // POST a new donation item
app.put('/api/donations/:id', updateTrackingStatus); // PUT update tracking status of a donation item
app.delete('/api/donations/:id', deleteDonation); // DELETE a donation item
app.get('/api/donations/reports',generateDonationReports);

//Donationspay
app.use('/api/v11',router11);
app.get("/api/v11/Donations/",getAllDonationspay);
app.get("/api/v11/Donations/total",getTotalDonationspay);
app.get("/api/v11/Donations/highest",getHighestDonorpay);
app.delete("/api/v11/Donations/:id",deleteDonationpay);
app.get("/api/v11/Donations/daily",getDailyDonationspay);


//homepage 
app.use("/api/v12",router12);
app.post("/api/v12/photos",upload, createHomePhoto);
app.get("/api/v12/photos", getAllHomePhotos);

app.delete("/api/v12/photos:id", deleteHomePhoto);
app.put("/api/v12/photos:id", updateHomePhoto);










export { app };
