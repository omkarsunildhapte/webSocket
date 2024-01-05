const axios = require('axios');
const { generateSignature } = require('./signatureUtils'); // Adjust the path accordingly

const getWalletBalance = async (req, res) => {
    try {
        const apiKey = process.env.BYBIT_API_KEY;
        const timestamp = Date.now().toString();
        const recvWindow = '20000';
        const parameters = `accountType=UNIFIED&coin=BTC`;

        const signature = generateSignature(timestamp, apiKey, recvWindow, parameters);

        // Make the API request
        const response = await axios.get('https://api.bybit.com/v5/account/wallet-balance', {
            params: {
                accountType: 'UNIFIED',
                coin: 'BTC',
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

module.exports = { getWalletBalance };
