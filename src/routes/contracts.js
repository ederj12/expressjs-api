const { Router } = require('express');
const { getProfile } = require('../middleware/getProfile');
const { getContractById, getContracts } = require('../controllers/contracts');
const router = Router();

router.get('/', getProfile, async (req, res, next) => {
  try {
    const { Contract } = req.app.get('models');
    const { dataValues } = req.profile;
    const contracts = await getContracts(dataValues, Contract);
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
    const contract = await getContractById(id, dataValues, Contract);
    res.json(contract);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
