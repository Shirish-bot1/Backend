import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
const photos = sequelize.define("Images", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
     
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      
    }
});

export const imagetable= async()=>{
   
    try {
      await sequelize.sync({ alter: true });
      console.log("Image table created successfully.");
    } catch (error) {
      console.error("Error creating Image table:", error);
    }
};

export {photos};
