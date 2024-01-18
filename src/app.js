const { contractsRouter, jobsRouter, profilesRouter } = require('./routes');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./model');

const app = express();

dotenv.config();

app.use(express.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);
app.use(morgan('tiny'));

app.use('/profiles', profilesRouter);
app.use('/contracts', contractsRouter);
app.use('/jobs', jobsRouter);
//error handler
app.use((err, _req, res, _next) => {
  if (err.stack) {
    return res.status(500).send('Something broke!');
  }
  res.status(err.status).json(err);
});

module.exports = app;
