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
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export  {Donation};
