const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const morgan = require('morgan');

app.use(express.json());
app.use(cors()); 
app.use(morgan('dev'));

const productRoutes = require('./routes/productsRoutes');
const stockRoutes = require('./routes/stockRoutes');

app.use('/api/products', productRoutes);
app.use('/api/stock-price', stockRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
