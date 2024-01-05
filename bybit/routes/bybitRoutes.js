const express = require('express');
const router = express.Router();
const { getAccountInfo } = require('../controllers/accountInfoController');
const { getActiveOrders } = require('../controllers/activeOrdersController');
const { getAssetTransferInfo } = require('../controllers/getAssetTransferInfo');
const { getClosedPnL } = require('../controllers/closedPnLController');
const { getExecutionList } = require('../controllers/executionController');
const { getHistoricalOrders } = require('../controllers/historicalOrdersController');
const { getPosition } = require('../controllers/positionController');
const { getTransactionLog } = require('../controllers/transactionLogController');
const { getWalletBalance } = require('../controllers/walletBalanceController');
const { queryAccountCoinBalance } = require('../controllers/queryAccountCoinBalance');
const { queryAllAccountCoinsBalance } = require('../controllers/queryAllAccountCoinBalance');
const { queryInterTransferList } = require('../controllers/queryInterTransferList');
const { queryDepositRecords } = require('../controllers/queryDepositRecords');
const { queryWithdrawalRecords } = require('../controllers/queryWithdrawalRecords');
const { getMarketTime } = require('../controllers/getMarketTime')
//server time 
router.get('/getMarketTime', getMarketTime)

router.get('/activeOrders', getActiveOrders);

router.get('/closedPnL', getClosedPnL);
router.get('/walletBalance', getWalletBalance);
router.get('/execution', getExecutionList);
router.get('/transactionLog', getTransactionLog);
router.get('/accountInfo', getAccountInfo);
router.get('/historicalOrders', getHistoricalOrders);
router.get('/position', getPosition);
router.get('/assetTransferInfo', getAssetTransferInfo);
router.get('/queryAccountCoinBalance', queryAccountCoinBalance);
router.get('/queryAllAccountCoinsBalance', queryAllAccountCoinsBalance);
router.get('/queryInterTransferList', queryInterTransferList);
router.get('/queryDepositRecords', queryDepositRecords);
router.get('/queryWithdrawalRecords', queryWithdrawalRecords);

module.exports = router;
