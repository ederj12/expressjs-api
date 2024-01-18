const { errors } = require('../utils');

module.exports = {
  deposit: async function (clientId, models, amount) {
    const { Contract, Job, Profile } = models;

    const profile = await Profile.findOne({
      where: { id: clientId }
    });

    const contracts = await Contract.findAll({
      raw: true,
      attributes: ['id'],
      where: { id: profile.id }
    });

    const contractsIds = contracts.map((contract) => contract.id);

    const jobPrices = await Job.findAll({
      raw: true,
      attributes: ['price'],
      where: { contractId: contractsIds, paid: null }
    });
    if (jobPrices.length === 0)
      return { message: 'There are not jobs pending to pay' };
    const totalPrice = jobPrices.reduce((ac, cv) => ac + cv.price, 0);
    const percentage = (amount / totalPrice) * 100;

    if (percentage > 25) throw errors.amountError;

    profile.balance = profile.balance + amount;
    profile.save();

    return { id: profile.id, balance: profile.balance };
  }
};
