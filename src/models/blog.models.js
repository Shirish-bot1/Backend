import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export const blogtable= async()=>{
   
    try {
      await sequelize.sync({ alter: true });
      console.log("Blog table created successfully.");
    } catch (error) {
      console.error("Error creating blog table:", error);
    }
};

export{Blog}
