
import { sequelize } from "../db/index";
const { DataTypes } = require('sequelize');

const Users = sequelize.define('Register',{

username:{
    type: DataTypes.STRING,
    allowNull:false
},
email:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:true,
},
password:{
    type: DataTypes.STRING,
    allowNull:false
},

 IsAdmin : {
    type:DataTypes.BOOLEAN,
    default:false,
 }
});
(async ()=>{
    try{
        await sequelize.sync({alter:true});
        console.log("user table created successfully");
    }catch(error){
        console.error("error creating user table:",error);
     

    
    }
})();

export  { Users } ; 
