import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const DonationItem = sequelize.define('DonationItem', {
  itemName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  donorName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  donorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Validate donor email format
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'received'),
    allowNull: false,
    defaultValue: 'pending', // Default status for new donations
  },
  trackingStatus: {
    type: DataTypes.ENUM('submitted', 'in_transit', 'delivered', 'received'),
    allowNull: false,
    defaultValue: 'submitted', // Default tracking status for new donations
  },
  imageUrl: {
    type: DataTypes.STRING, // Assuming you're storing the image URL
    allowNull: true, // Allow null for cases where image is optional
  },
});

export { DonationItem };
