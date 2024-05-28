import axios from 'axios';

export const initiateKhaltiPayment = async (req, res) => {
  const payload = req.body;
  try {
    const khaltiResponse = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', payload, {
      headers: {
        Authorization: `Key 835c918972134793a26c82a417b49b1d` // Use the secret key from environment variables
      }
    });
    res.json(khaltiResponse.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
