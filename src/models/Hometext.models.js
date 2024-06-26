import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Hometext = sequelize.define("Hometext",{
    content: {
        type:DataTypes.TEXT,
        allownull: false
    },
    title: {
        type:DataTypes.STRING,
        allownull: false
    }
});

export const Hometextss = async() => {
    try{
     await sequelize.sync({alert:true});
     console.log("Text table created successfully");
    }catch(error){
     console.error("Error creating Text table:",error);
    }
};

export {Hometext};