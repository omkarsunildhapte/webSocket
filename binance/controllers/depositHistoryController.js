const axios = require('axios');

const getDepositHistory = async (req, res) => {
    try {
        const {
            includeSource,
            coin,
            status,
            startTime,
            endTime,
            offset,
            limit,
            recvWindow,
            timestamp,
            txId,
        } = req.query;

        const response = await axios.get('https://api.binance.com/sapi/v3/capital/deposit/hisrec', {
            params: {
                includeSource,
                coin,
                status,
                startTime,
                endTime,
                offset,
                limit,
                recvWindow,
                timestamp,
                txId,
            },
            headers: {
                'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
            },
        });

        res.json({ data: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getDepositHistory };
