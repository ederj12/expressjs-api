const { Router } = require('express');
const { getProfile } = require('../middleware/getProfile');
const { contractsController } = require('../controllers');
const router = Router();

router.get('/', getProfile, async (req, res, next) => {
  try {
    const { Contract } = req.app.get('models');
    const { dataValues } = req.profile;
    const contracts = await contractsController.getContracts(
      dataValues,
      Contract
    );
    res.json(contracts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', getProfile, async (req, res, next) => {
  try {
    const { Contract } = req.app.get('models');
    const { id } = req.params;
    const { dataValues } = req.profile;
    const contract = await contractsController.getContractById(
      id,
      dataValues,
      Contract
    );
    res.json(contract);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
