const { validationResult } = require('express-validator');
const stockPriceData = require('../data/stock-price.js');

exports.getProductStockAndPrice = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productId = req.params.id;
    const productInfo = stockPriceData[productId];

    if (!productInfo) {
      return res.status(404).json({ error: 'Product stock and price not found' });
    }

    const response = {
      price: (productInfo.price / 100).toFixed(2),
      stock: productInfo.stock,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching product information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
