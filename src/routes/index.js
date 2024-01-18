const adminRouter = require('./admin');
const balancesRouter = require('./balances');
const contractsRouter = require('./contracts');
const jobsRouter = require('./jobs');
const profilesRouter = require('./profiles');
module.exports = {
  adminRouter,
  balancesRouter,
  contractsRouter,
  jobsRouter,
  profilesRouter
};
