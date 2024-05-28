import express from 'express';

import { initiateKhaltiPayment } from '../Controllers/payment.controller.js';



const router7 = express.Router()

router7.post('/khalti-api',initiateKhaltiPayment);
export {router7 as paymentRouter};