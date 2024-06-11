import { DonationItem } from "../models/DonationItem.js";
import { sequelize } from "../db/index.js";
import { upload } from "../middlewares/multer.js";

// Controller function to get all donation items
const getAllDonations = async (req, res) => {
  try {
    const donations = await DonationItem.findAll();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createDonation = async (req, res) => {
 
  
    try {
      const { itemName, description, category, quantity, condition, donorName, donorEmail } = req.body;
      const file = req.file;
      console.log("fiASDFAHSDFHAle",file)
    
    
      if (!file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const newDonation = await DonationItem.create({
        itemName,
        description,
        category,
        quantity,
        condition,
        donorName,
        donorEmail,
        imageUrl: `/uploads/${file.filename}`,
      });

      console.log("data created", newDonation);
      res.status(201).json(newDonation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}



const updateTrackingStatus = async (req, res) => {
  const { id } = req.params;
  const { trackingStatus } = req.body;
  try {
    const donation = await DonationItem.findByPk(id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    donation.trackingStatus = trackingStatus;
    await donation.save();
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a donation item
const deleteDonation = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await DonationItem.findByPk(id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    await donation.destroy();
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const generateDonationReports = async (req, res) => {
  try {
   
    const reports = await DonationItem.findAll({
      attributes: [
        'category',
        'trackingStatus',
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
      ],
      group: ['category', 'trackingStatus'],
    });
    res.status(200).json(reports);
  } catch (error) {
   
    console.error('Error generating donation reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


  
  export {
    getAllDonations,
    createDonation,
    updateTrackingStatus,
    deleteDonation,
    generateDonationReports, 
  };
  