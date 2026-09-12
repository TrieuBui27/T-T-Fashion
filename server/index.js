const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./utils/MongooseUtil');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const adminRouter = require('./api/admin');
const customerRouter = require('./api/customer');

app.use('/api/admin', adminRouter);
app.use('/api/customer', customerRouter);

// serve React build
app.use(express.static(path.join(__dirname, '../client/build')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});