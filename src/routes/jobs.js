const { Router } = require('express');
const { getProfile } = require('../middleware/getProfile');
const { jobsController } = require('../controllers');
const router = Router();

router.get('/unpaid', getProfile, async (req, res, next) => {
  try {
    const models = req.app.get('models');
    const { dataValues } = req.profile;
    const jobs = await jobsController.getUnpaidJobs(dataValues, models);
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

router.post('/:job_id/pay', getProfile, async (req, res, next) => {
  const db = req.app.get('sequelize');
  const transaction = await db.transaction();
  try {
    const models = req.app.get('models');

    const client = req.profile;
    if (client.dataValues.type !== 'client') {
      return res.status(400).end();
    }
    const jobId = req.params.job_id;

    const payment = await jobsController.payJob(jobId, client, models);
    await transaction.commit();
    res.status(200).json(payment);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    next(error);
  }
});

module.exports = router;
