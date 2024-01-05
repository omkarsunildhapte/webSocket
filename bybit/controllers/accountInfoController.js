const axios = require('axios');
const { generateSignature } = require('./signatureUtils'); // Replace with the correct path

const getAccountInfo = async (req, res) => {
    try {
        const apiKey = process.env.BYBIT_API_KEY;
        const apiSecret = process.env.BYBIT_SECRET;
        const timestamp = Date.now().toString();
        const recvWindow = '20000';

        // Define the request parameters
        const parameters = '';

        // Generate the signature using the imported function
        const signature = generateSignature(timestamp, apiKey, recvWindow, parameters);

        // Make the API request
        const response = await axios.get('https://api.bybit.com/v5/account/info', {
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

module.exports = { getAccountInfo };
