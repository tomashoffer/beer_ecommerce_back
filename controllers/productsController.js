const { validationResult } = require('express-validator');
const productData = require('../data/products.js');
const stockPriceData = require('../data/stock-price.js');

exports.getAllProducts = (req, res) => {
  try {
    const productsWithPrices = productData.map((product) => ({
      id: product.id,
      brand: product.brand,
      price: (stockPriceData[product.skus[0].code].price / 100).toFixed(2),
      sku: product.skus[0].code,
      image: product.image
    }));

    res.json(productsWithPrices);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProduct = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productId = parseInt(req.params.id);

    const product = productData.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const skuCode = product.skus[0].code;
    const skuInfo = stockPriceData[skuCode];

    if (!skuInfo) {
      return res.status(404).json({ error: 'Product stock and price not found' });
    }

    const response = {
      id: product.id,
      brand: product.brand,
      image: product.image,
      style: product.style,
      substyle: product.substyle,
      abv: product.abv,
      origin: product.origin,
      information: product.information,
      price: (skuInfo.price / 100).toFixed(2),
      stock: skuInfo.stock,
      skus: product.skus
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
