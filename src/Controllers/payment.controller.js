import axios from 'axios';
import { Donation } from '../models/donation.model.js';



export const initiateKhaltiPayment = async (req, res) => {
  const payload = req.body;

  try {
    // Save donation to the database
    const newDonation = await Donation.create({
      amount: payload.amount,
      name: payload.customer_info.name,
      email: payload.customer_info.email,
      phone: payload.customer_info.phone,
      purchaseOrderId: payload.purchase_order_id,
      purchaseOrderName: payload.purchase_order_name,
      merchantExtra: payload.merchant_extra,
    });

    // Perform Khalti payment initiation
    const khaltiResponse = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', payload, {
      headers: {
        Authorization: `Key 835c918972134793a26c82a417b49b1d`
      }
    });

    if (khaltiResponse) {
      res.json({ donation: newDonation, payment_url: khaltiResponse.data.payment_url });
    }
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

