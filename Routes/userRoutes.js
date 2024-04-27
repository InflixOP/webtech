const express = require('express');
const { buyStock, getUserBuy} = require('../controllers/userholdings');
const router = express.Router();

router.post('/userbuy',buyStock)
router.get('/userbuy', getUserBuy);

module.exports = router;

