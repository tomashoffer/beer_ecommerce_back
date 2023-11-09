const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController')
const { check } = require('express-validator')


router.get('/:id', [
    check('id').isInt().withMessage('Product ID must be an integer'),
  ], stockController.getProductStockAndPrice);
module.exports = router;