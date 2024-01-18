const { Op } = require('sequelize');
const { errors } = require('../utils');

module.exports = {
  getUnpaidJobs: async function (profile, models) {
    const { Contract, Job } = models;
    const contracts = await Contract.findAll({
      attributes: ['id'],
      where: {
        [Op.or]: [{ clientId: profile.id }, { contractorId: profile.id }],
        status: 'in_progress'
      }
    });
    if (contracts.length === 0) throw errors.notFound;
    const contractsId = contracts.map((contract) => contract.id);
    const jobs = await Job.findAll({ where: { contractId: contractsId } });
    return jobs;
  },
  payJob: async function (id, client, models) {
    const { Job, Contract, Profile } = models;
    const job = await Job.findOne({ where: { id: id, paid: null } });

    if (!job) throw errors.jobPaid;

    if (client.dataValues.balance < job.dataValues.price)
      throw errors.balanceError;

    const contract = await Contract.findOne({
      raw: true,
      attributes: ['ContractorId'],
      where: { id: job.ContractId }
    });
    //update amount to contractor balance
    console.log('contractor', contract.ContractorId);
    const contractor = await Profile.findOne({
      where: { id: contract.ContractorId }
    });

    const jobPrice = job.dataValues.price;
    contractor.balance = contractor.dataValues.balance + jobPrice;
    client.balance = client.dataValues.balance - jobPrice;

    //update contractor
    await contractor.save({ fields: ['balance'] });
    //update client
    await client.save({ fields: ['balance'] });
    //update job
    job.paid = 1;
    job.paymentDate = new Date();
    await job.save({ fields: ['paid', 'paymentDate'] });
    return { message: 'Sucessfully payment' };
  }
};
