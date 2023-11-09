const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')
const { check } = require('express-validator')

router.get('/', productsController.getAllProducts);

router.get('/:id', [
    check('id').isInt().withMessage('Product ID must be an integer'),
  ], productsController.getProduct);
module.exports = router;