import axios from 'axios';
import { Donation } from '../models/donation.model.js';




export const initiateKhaltiPayment = async (req, res) => {
  const payload = req.body;

  try {
    console.log("Payload received:", payload);  

    const khaltiResponse = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', payload, {
      headers: {
        Authorization: `Key 835c918972134793a26c82a417b49b1d`,
      },
    });

    if (khaltiResponse.status === 200 && khaltiResponse.data && khaltiResponse.data.pidx) {
      const amountInRupees = payload.amount / 100;
      const pidx = khaltiResponse.data.pidx;

     
      const newDonation = await Donation.create({
        amount: amountInRupees,
        name: payload.customer_info.name,
        email: payload.customer_info.email,
        phone: payload.customer_info.phone,
        purchaseOrderId: payload.purchase_order_id,
        purchaseOrderName: payload.purchase_order_name,
        merchantExtra: payload.merchant_extra,
        pidx: pidx,
      });

      res.json({ donation: newDonation, payment_url: khaltiResponse.data.payment_url, pidx: pidx });
    } else {
      console.error("Khalti payment initiation failed:", khaltiResponse.data);
      res.status(400).json({ error: "Khalti payment initiation failed" });
    }
  } catch (error) {
    console.error("Error initiating Khalti payment:", error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const verifyKhaltiPayment = async (req, res) => {vs
  const { pidx } = req.body; 

  try {
      const response = await axios.post('https://a.khalti.com/api/v2/epayment/lookup/', {
          pidx
      }, {
          headers: {
              Authorization: `Key 835c918972134793a26c82a417b49b1d`
          }
      });

      console.log("response", response.data);
      res.json(response.data);
  } catch (error) {
      if (error.response) {
          res.status(error.response.status).json({ error: error.response.data });
      } else {
          res.status(500).json({ error: error.message });
      }
  }
};
