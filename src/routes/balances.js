const { Router } = require('express');
const { balancesController } = require('../controllers');
const { errors } = require('../utils');
const router = Router();

router.post('/deposit/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const models = req.app.get('models');
    const amount = req.body.amount;
    if (isNaN(userId) | isNaN(amount)) throw errors.badRequest;
    const deposit = await balancesController.deposit(userId, models, amount);
    res.status(200).json(deposit);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
