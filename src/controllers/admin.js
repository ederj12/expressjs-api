const { Op } = require('sequelize');
module.exports = {
  bestProfession: async (start, end, models) => {
    const { Profile, Contract, Job } = models;
    const startDate = new Date(start);
    const endDate = new Date(end);
    //pending to implement logic
  },
  bestClients: async (start, end, limit, models) => {
    const { Profile, Contract, Job } = models;
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (!isValidDate(startDate) || !isValidDate(endDate) || startDate > endDate)
      throw {
        status: 400,
        message: 'Invalid dates entered'
      };

    const data = await Profile.findAll({
      where: { type: 'client' },
      include: {
        model: Contract,
        as: 'Client',
        include: {
          model: Job,
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate]
            }
          }
        }
      }
    });

    const result = data.map((client) => {
      const paid = client.Client.reduce((ac, cv) => {
        const contractTotalPaid = cv.Jobs.reduce((ac, cv) => {
          ac = ac + cv.price;
          return ac;
        }, 0);
        ac = ac + contractTotalPaid;
        return ac;
      }, 0);

      return {
        id: client.id,
        fullName: `${client.firstName} ${client.lastName}`,
        paid
      };
    });

    const sortedResult = result
      .sort((a, b) => b.paid - a.paid)
      .slice(0, limit | 2);

    return sortedResult;
  }
};
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
