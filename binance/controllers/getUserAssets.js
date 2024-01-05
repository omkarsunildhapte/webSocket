const axios = require('axios');
const { generateSignature } = require('./signatureUtils');

const getUserAssets = async (req, res) => {
    try {
        const { data: serverTime } = await axios.get('https://api.binance.com/api/v3/time');
        const timestamp = serverTime.serverTime;

        const recvWindow = 5000;
        const payload = {
            timestamp,
            recvWindow,
            needBtcValuation: true,
        };
        if (req.body.asset) {
            payload.asset = req.body.asset; // Fix: Use req.body.asset instead of req.body
        }

        const signature = generateSignature(timestamp, process.env.BINANCE_API_SECRET, recvWindow, payload);

        const response = await axios.post(
            'https://api.binance.com/sapi/v3/asset/getUserAsset',
            null,
            {
                params: {
                    ...payload,
                    signature,
                },
                headers: {
                    'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
                },
            }
        );

        // Log the response data
        console.log('Response Data:', response.data);

        res.json(response.data);
    } catch (error) {
        console.error('Error during getUserAssets:', error);

        if (error.response) {
            console.error('Binance API responded with:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received from Binance API. Request:', error.request);
        } else {
            console.error('Error setting up or making the request:', error.message);
        }

        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
};

module.exports = { getUserAssets };
