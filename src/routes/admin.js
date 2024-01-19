const { Router } = require('express');
const { adminController } = require('../controllers');
const router = Router();

router.get('/best-profession', async (req, res, next) => {
  try {
    const { start, end } = req.query;
    const models = req.app.get('models');

    //const result = await adminController.bestProfession(start, end, models);

    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.get('/best-clients', async (req, res, next) => {
  try {
    const { start, end, limit } = req.query;
    const models = req.app.get('models');

    const result = await adminController.bestClients(start, end, limit, models);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
