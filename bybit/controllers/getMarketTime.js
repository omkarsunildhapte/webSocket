const axios = require('axios');

const getMarketTime = async (req, res) => {
    try {
        const response = await axios.get('https://api.bybit.com/v5/market/time');
        return response.data;
    } catch (error) {
        throw error;
    }
};

module.exports = { getMarketTime };
