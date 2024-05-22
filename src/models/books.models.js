
import { DataTypes } from 'sequelize';
import { sequelize } from "../db/index.js";

 const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const booktable= async()=>{
   
    try {
      await sequelize.sync({ alter: true });
      console.log("Books table created successfully.");
    } catch (error) {
      console.error("Error creating User table:", error);
    }
};

export {Book};
