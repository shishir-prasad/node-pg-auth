const express = require('express');
const app = express();
const cors = require('cors');
const createError = require('http-errors');
const authRoutes = require('./routes/authRoutes');
require('./config/passport');
require('dotenv').config();

// middlewares

app.use(express.json());
app.use(cors());

// routes

app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Test Document');
});
app.use(async (req, res, next) => {
  next(createError(404, 'This Route does not exist'));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.listen(5000, () => {
  /* eslint no-console: "error" */

  // custom console
  console.log('App is running in port 5000');
});
