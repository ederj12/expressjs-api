const { Router } = require('express');
const { contractsController } = require('../controllers');
const { getProfile } = require('../middleware/getProfile');

const router = Router();

router.get('/', getProfile, async (req, res, next) => {
  try {
    const { Contract } = req.app.get('models');
    const profile = req.profile;
    const contracts = await contractsController.getContracts(profile, Contract);
    res.json(contracts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', getProfile, async (req, res, next) => {
  try {
    const { Contract } = req.app.get('models');
    const { id } = req.params;
    const profile = req.profile;
    const contract = await contractsController.getContractById(
      id,
      profile,
      Contract
    );
    res.json(contract);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
