const express = require('express');
const router = express.Router();
const { getAllCoinsInfo } = require('../controllers/getAllCoinsInfo');
const { getDepositHistory } = require('../controllers/depositHistoryController');
const { getWithdrawHistory } = require('../controllers/getWithdrawHistory');
const { getConvertibleAssets } = require('../controllers/getConvertibleAssets');
const { getUserAssets } = require('../controllers/getUserAssets');
const { checkOrderStatus } = require('../controllers/orderController');
const { getAllOrders } = require('../controllers/getAllOrders')



router.get('/getAllCoinsInfo', getAllCoinsInfo);
router.get('/depositHistory', getDepositHistory);
router.get('/getWithdrawHistory', getWithdrawHistory);
router.get('/getConvertibleAssets', getConvertibleAssets);
router.post('/getUserAssets', getUserAssets); // Change to POST

router.get('/checkOrderStatus', checkOrderStatus);
router.get('/getAllOrders', getAllOrders)

module.exports = router;
