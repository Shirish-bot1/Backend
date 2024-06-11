import express from 'express';
import { deleteDonationpay, getAllDonationspay, getDailyDonationspay, getHighestDonorpay, getTotalDonationspay } from '../Controllers/donate.manipu.js';


const router11 = express.Router();

router11.get("/Donations",getAllDonationspay);
router11.get("/Donations/total",getTotalDonationspay);
router11.get("/Donations/highest",getHighestDonorpay);
router11.delete("/Donations/:id",deleteDonationpay);
router11.get("/Donations/daily",getDailyDonationspay);
export{router11}
