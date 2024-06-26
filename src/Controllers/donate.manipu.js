import { Donation } from "../models/donation.model.js";
import { Op,Sequelize } from "sequelize";

export const getAllDonationspay = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      attributes: ['id', 'amount', 'name', 'email', 'phone', 'timestamp', 'pidx'], 
      where: {
        timestamp: {
          [Op.not]: null, 
        },
      },
    });

   
    const formattedDonations = donations.map((donation) => ({
      id: donation.id,
      amount: donation.amount,
      name: donation.name,
      email: donation.email,
      phone: donation.phone,
    
      timestamp: new Date(donation.timestamp).toLocaleString(), 
      pidx: donation.pidx,
    }));

    res.json(formattedDonations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
  
  export const getTotalDonationspay = async (req, res) => {
    try {
      const total = await Donation.sum('amount');
      res.json({ total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  export const getHighestDonorpay = async (req, res) => {
    try {
      const highestDonation = await Donation.findOne({
        order: [['amount', 'DESC']],
      });
      res.json(highestDonation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
 
  export const deleteDonationpay = async (req, res) => {
    const { id } = req.params;
    try {
      const donation = await Donation.findByPk(id);
      if (!donation) {
        return res.status(404).json({ error: 'Donation not found' });
      }
      await donation.destroy();
      res.json({ message: 'Donation deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const getDailyDonationspay = async (req, res) => {
    try {
      const donations = await Donation.findAll({
        attributes: [
          [Sequelize.fn('DATE', Sequelize.col('timestamp')), 'date'],
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'],
          [Sequelize.fn('STRING_AGG', Sequelize.col('name'), ','), 'donors'], 
        ],
        group: [Sequelize.fn('DATE', Sequelize.col('timestamp'))],
        order: [[Sequelize.fn('DATE', Sequelize.col('timestamp')), 'DESC']],
      });
  
      const formattedDonations = donations.map(donation => ({
        date: donation.get('date'),
        totalAmount: donation.get('totalAmount'),
        donors: donation.get('donors').split(','), 
      }));
  
      res.json(formattedDonations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  