import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";



const Text = sequelize.define('Text',{
     content:{
        type:DataTypes.TEXT,
        allowNull:true,
     } 

})

export const texttable = async ()=>{
    try{
     await sequelize.sync({alter:true});
     console.log("text table created successfully")
   

    }catch(error){
        console.error("Error creating a text table",error)
        

    }


}
export{Text};