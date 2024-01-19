const { Op } = require('sequelize');
const { errors } = require('../utils');

module.exports = {
  getContractById: async function (id, profile, Contract) {
    const contract = await Contract.findOne({
      where: {
        id,
        [Op.or]: [{ clientId: profile.id }, { contractorId: profile.id }]
      }
    });
    if (!contract) throw errors.notFound;
    return contract;
  },
  getContracts: async function (profile, Contract) {
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [{ clientId: profile.id }, { contractorId: profile.id }]
      }
    });
    if (contracts.length === 0) throw errors.notFound;
    return contracts;
  }
};
