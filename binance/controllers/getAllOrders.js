const axios = require('axios');
const { generateSignature } = require('./signatureUtils');

const getAllOrders = async (req, res) => {
    try {
        // Retrieve server time from Binance API
        const serverTimeResponse = await axios.get('https://api.binance.com/api/v3/time');
        const serverTime = serverTimeResponse.data.serverTime;

        // Ensure timestamp is synchronized with Binance server time
        const timestamp = serverTime + 1000;

        const symbol = req.query.symbol || 'LTCBTC';
        const orderId = req.query.orderId || undefined;
        const startTime = req.query.startTime || undefined;
        const endTime = req.query.endTime || undefined;
        const limit = req.query.limit || 500;
        const recvWindow = req.query.recvWindow || 5000;

        const params = {
            symbol,
            orderId,
            startTime,
            endTime,
            limit,
            recvWindow,
            timestamp,
        };

        // Generate the signature
        const signature = generateSignature(timestamp, process.env.BINANCE_API_SECRET, recvWindow, params);

        // Include the signature in the request headers
        const headers = {
            'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
        };

        // Add signature to headers
        headers['signature'] = signature;

        // Make the GET request to Binance API
        const response = await axios.get('https://api.binance.com/api/v3/allOrders', {
            params,
            headers,
        });

        // Log details for debugging
        console.log('Request URL:', response.config.url);
        console.log('Request Params:', response.config.params);
        console.log('Request Headers:', response.config.headers);

        res.json(response.data);
    } catch (error) {
        console.error('Error getting all orders:', error.message);
        console.error('Binance API response:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
};

module.exports = { getAllOrders };
