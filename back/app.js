const express = require('express');

const dbconnect = require('./config/dbconnect');
const app = express();
const router = require('./routes/productRoutes');
const cors = require('cors');
app.use(cors());
app.use(express.json());

dbconnect();

app.use('/api/v1/fashionLine', router);

const port = 3001; 
app.listen(port, () => { 
  console.log(`El servidor está en el puerto ${port}`);
});