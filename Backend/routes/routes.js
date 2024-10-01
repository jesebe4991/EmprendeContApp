const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');
const mediaController = require('../controllers/mediaController');
const ahorroController = require('../controllers/ahorrosController');
const auth = require('../middlewares/auth');

router.use('/usuarios', userController);
router.use('/transaction', transactionController);
router.use('/media', mediaController);
router.use('/ahorro', ahorroController);

module.exports = router;