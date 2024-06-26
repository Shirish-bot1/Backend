import express from 'express';

import { initiateKhaltiPayment,verifyKhaltiPayment } from '../Controllers/payment.controller.js';



const router7 = express.Router()

router7.post('/khalti-api',initiateKhaltiPayment);
router7.post('/khalti-verify', verifyKhaltiPayment);


export {router7 as paymentRouter};