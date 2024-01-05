const axios = require('axios');
const { generateSignature } = require('./signatureUtils');
const { getMarketTime } = require('./getMarketTime');

const getActiveOrders = async (req, res) => {
    try {
        const apiKey = process.env.BYBIT_API_KEY;
        const serverTimeResponse = await getMarketTime();
        const serverTimestamp = serverTimeResponse.time_now;
        const localTimestamp = Date.now();
        const timeDifference = serverTimestamp - localTimestamp;
        const timestamp = Math.floor(Date.now() + timeDifference);
        const recvWindow = '20000';
        const parameters = `category=linear&symbol=ETHUSDT&openOnly=0&limit=1`;
        const signature = generateSignature(timestamp, apiKey, recvWindow, parameters);
        const response = await axios.get('https://api.bybit.com/v5/order/realtime', {
            params: {
                category: 'linear',
                // symbol: 'ETHUSDT',
                // openOnly: 0,
                // limit: 1,
            },
            headers: {
                'X-BAPI-API-KEY': apiKey,
                'X-BAPI-TIMESTAMP': timestamp,
                'X-BAPI-RECV-WINDOW': recvWindow,
                'X-BAPI-SIGN': signature,
            },
        });
        console.log(response.data)
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getActiveOrders };
