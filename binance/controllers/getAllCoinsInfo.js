const axios = require('axios');
const { generateSignature } = require('./signatureUtils');

const getAllCoinsInfo = async (req, res) => {
    try {
        const apiKey = process.env.BINANCE_API_KEY;
        const apiSecret = process.env.BINANCE_API_SECRET;
        const timestamp = Date.now();
        const recvWindow = 5000;
        const signature = generateSignature({ timestamp, recvWindow }, apiSecret);
        const response = await axios.get('https://api.binance.com/sapi/v3/capital/config/getall', {
            headers: {
                'X-MBX-APIKEY': apiKey,
            },
            params: { timestamp, recvWindow, signature, },
        });

        res.json({ data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.response ? error.response.data : error.message, });
    }
};

module.exports = { getAllCoinsInfo };
