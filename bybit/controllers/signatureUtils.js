const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const generateSignature = (timestamp, apiKey, recvWindow, parameters) => {
    const hmac = CryptoJS.HmacSHA256(
        timestamp + apiKey + recvWindow + parameters,
        process.env.BYBIT_SECRET
    );
    return CryptoJS.enc.Hex.stringify(hmac);
};

module.exports = { generateSignature };
