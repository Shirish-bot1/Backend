
import { app } from "./app.js";
import { dbConnection } from "./db/index.js";
import dotenv from "dotenv";
import { usertable } from "./models/users.models.js";
import { booktable } from "./models/books.models.js";
import { imagetable } from "./models/photos.models.js";
import { complaintable } from "./models/complain.models.js";
import { blogtable } from "./models/blog.models.js";
import { texttable } from "./models/text.model.js";
import {  Hometextss } from "./models/Hometext.models.js";
import { Khaltidonation } from "./models/donation.model.js";


dotenv.config({
  path: "./.env",
});

dbConnection()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on PORT ${process.env.PORT || 5000}`);
      usertable(); 
      booktable();
      imagetable();
      complaintable();
      blogtable();
      texttable();
      Hometextss();
      Khaltidonation();
     

    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });