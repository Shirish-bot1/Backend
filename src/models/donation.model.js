import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Donation = sequelize.define('Donation', {
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchaseOrderId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purchaseOrderName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  merchantExtra: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pidx: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});
export const Khaltidonation= async()=>{
   
  try {
    await sequelize.sync({ alter: true });
    console.log("Khalti donation table created successfully.");
  } catch (error) {
    console.error("Error creating Khalti donation table:", error);
  }
};


export  {Donation};
