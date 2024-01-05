const crypto = require('crypto');

const generateSignature = (timestamp, apiKey, recvWindow, parameters) => {
    const data = `${timestamp}${apiKey}${recvWindow}${parameters}`;
    const hmac = crypto.createHmac('sha256', process.env.BINANCE_SECRETE);
    hmac.update(data);
    return hmac.digest('hex');
};

module.exports = { generateSignature };
