const axios = require('axios');
const crypto = require('crypto');

const getServerTime = async () => {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/time');
        return response.data.serverTime;
    } catch (error) {
        throw new Error('Error fetching server time from Binance API');
    }
};

const generateSignature = (timestamp, apiKey, recvWindow, parameters) => {
    const data = `${timestamp}${apiKey}${recvWindow}${parameters}`;
    const hmac = crypto.createHmac('sha256', process.env.BINANCE_SECRETE);
    hmac.update(data);
    return hmac.digest('hex');
};

const checkOrderStatus = async (req, res) => {
    try {
        // Get the Binance server time
        const serverTime = await getServerTime();

        // Adjust your timestamp to be within an acceptable range
        const timestamp = serverTime - 1000; // Subtract 1000ms

        const params = {
            symbol: 'LTCBTC',
            orderId: req.query.orderId,
            origClientOrderId: req.query.origClientOrderId,
            recvWindow: req.query.recvWindow || 5000,
            timestamp: timestamp,
        };

        const signature = generateSignature(timestamp, process.env.BINANCE_API_KEY, params.recvWindow, params);
        params.signature = signature;

        const response = await axios.get('https://api.binance.com/api/v3/order', { params });
        res.json(response.data);
    } catch (error) {
        // Handle errors
        if (error.response) {
            console.error('Binance API responded with:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received from Binance API. Request:', error.request);
        } else {
            console.error('Error setting up or making the request:', error.message);
        }

        res.status(500).json({ error: 'Internal Server Error. Please try again later.', error: error });
    }
};

module.exports = { checkOrderStatus };
