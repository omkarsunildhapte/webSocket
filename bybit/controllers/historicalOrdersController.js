const axios = require('axios');
const { generateSignature } = require('./signatureUtils');

const getHistoricalOrders = async (req, res) => {
    try {
        const apiKey = process.env.BYBIT_API_KEY;
        const apiSecret = process.env.BYBIT_SECRET;
        const timestamp = Date.now().toString();
        const recvWindow = '20000';
        const parameters = `category=linear&limit=1`;
        const signature = generateSignature(timestamp, apiKey, recvWindow, parameters);

        const response = await axios.get('https://api.bybit.com/v5/order/history', {
            params: {
                category: 'linear',
                limit: 1,
            },
            headers: {
                'X-BAPI-API-KEY': apiKey,
                'X-BAPI-TIMESTAMP': timestamp,
                'X-BAPI-RECV-WINDOW': recvWindow,
                'X-BAPI-SIGN': signature,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getHistoricalOrders };