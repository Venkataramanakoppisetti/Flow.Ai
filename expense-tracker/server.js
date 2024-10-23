const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const db = require('./database/db'); 

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', transactionRoutes);

const PORT = process.env.PORT;
const HOST = process.env.HOST;
app.listen(PORT,HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
