
import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

 const Complain = sequelize.define('Complain',{

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sex: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true
    }
  });
   
  export const complaintable = async()=>{
    try{
        await sequelize.sync({alter:true});
        console.log("complain table created")

    }catch(error){
  console.error("Erro creating table",error)

    }
  }
  export{Complain}