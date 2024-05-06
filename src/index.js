import { app } from "./app.js";
import { dbConnection } from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

dbConnection()
  .then(() => {
    pp.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on PORT ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });