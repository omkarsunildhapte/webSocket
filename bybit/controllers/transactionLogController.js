const axios = require('axios');
const { generateSignature } = require('./signatureUtils');

const getTransactionLog = async (req, res) => {
    try {
        const apiKey = process.env.BYBIT_API_KEY;
        const apiSecret = process.env.BYBIT_SECRET;
        const timestamp = Date.now().toString();
        const recvWindow = '20000';

        // Extract query parameters from the request
        const { accountType, category, currency, type, startTime, endTime, limit, cursor } = req.query;

        // Define the request parameters
        const parameters = `accountType=${accountType}&category=${category}&currency=${currency}&type=${type}&startTime=${startTime}&endTime=${endTime}&limit=${limit}&cursor=${cursor}`;

        // Generate the signature using the imported function
        const signature = generateSignature(timestamp, apiKey, recvWindow, parameters);

        // Make the API request
        const response = await axios.get('https://api.bybit.com/v5/account/transaction-log', {
            params: {
                accountType,
                category,
                currency,
                type,
                startTime,
                endTime,
                limit,
                cursor,
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

module.exports = { getTransactionLog };
