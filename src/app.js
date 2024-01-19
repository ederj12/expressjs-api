const {
  adminRouter,
  balancesRouter,
  contractsRouter,
  jobsRouter,
  profilesRouter
} = require('./routes');
const { db } = require('../DB');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

const app = express();

dotenv.config();

app.use(express.json());
app.set('sequelize', db.sequelize);
app.set('models', db.sequelize.models);
app.use(morgan('dev'));
app.use('/admin', adminRouter);
app.use('/balances', balancesRouter);
app.use('/contracts', contractsRouter);
app.use('/jobs', jobsRouter);
app.use('/profiles', profilesRouter);
//error handler
app.use((err, _req, res, _next) => {
  if (err.stack) {
    return res.status(500).send(err.stack);
  }
  res.status(err.status).json(err);
});

module.exports = app;
