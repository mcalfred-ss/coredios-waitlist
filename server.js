const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const joinRoute = require('./src/routes/joinRoute');

mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.MONGO_DB,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', joinRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
