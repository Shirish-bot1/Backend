import express from 'express';
import { getAllDonations,createDonation,updateTrackingStatus,deleteDonation, generateDonationReports } from '../Controllers/DonationItemcontroller.js';
import { upload } from '../middlewares/multer.js';


const router10 = express.Router();

// Routes for donation items
router10.get('/donations', getAllDonations); // GET all donation items
router10.post('/donations/create',upload, createDonation); // POST a new donation item
router10.put('/donations/:id', updateTrackingStatus); // PUT update tracking status of a donation item
router10.delete('/donations/:id', deleteDonation); // DELETE a donation item
router10.get('/donations/reports' ,generateDonationReports);




export{router10}