const axios = require('axios');
const { generateSignature } = require('./signatureUtils'); // Update the path accordingly

const getWithdrawHistory = async (req, res) => {
    try {
        const { coin, withdrawOrderId, status, offset, limit, startTime, endTime, recvWindow, timestamp, } = req.query;

        const queryString = `coin=${coin || ''}&withdrawOrderId=${withdrawOrderId || ''}&status=${status || ''}&offset=${offset || ''}&limit=${limit || ''}&startTime=${startTime || ''}&endTime=${endTime || ''}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
        const signature = generateSignature(timestamp, process.env.BINANCE_API_KEY, recvWindow, queryString);

        const response = await axios.get(`https://api.binance.com/sapi/v3/capital/withdraw/history?${queryString}&signature=${signature}`, {
            headers: {
                'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
            },
        });

        res.json({ data: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error });
    }
};

module.exports = { getWithdrawHistory };
