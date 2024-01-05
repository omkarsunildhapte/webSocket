const axios = require('axios');
const { generateSignature } = require('./signatureUtils');

const getConvertibleAssets = async (req, res) => {
    try {
        const timestamp = new Date().getTime();
        const recvWindow = 5000;
        const payload = {
            recvWindow,
            timestamp,
        };

        const signature = generateSignature(timestamp, process.env.BINANCE_API_KEY, recvWindow, payload);

        const response = await axios.post(
            'https://api.binance.com/sapi/v3/asset/dust-btc',
            null,
            {
                headers: {
                    'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
                    'Content-Type': 'application/json',
                },
                params: {
                    ...payload,
                    signature,
                },
            }
        );

        res.json({ data: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getConvertibleAssets };
