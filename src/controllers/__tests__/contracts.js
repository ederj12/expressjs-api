const { contractsController } = require('../index');
const { db } = require('../../../DB');
const { errors } = require('../../utils');
const { Contract } = db.sequelize.models;

describe('Test contracts controller', () => {
  beforeEach(async () => {
    //seed
  });
  test('Should return contract with id 1', async () => {
    const id = 1;
    const profile = { id: 1 };
    const data = await contractsController.getContractById(
      id,
      profile,
      Contract
    );
    expect(data.id).toBe(id);
  });
  test('Should return not found contracts error', async () => {
    const id = 100;
    const profile = { id: 90 };

    await expect(
      contractsController.getContractById(id, profile, Contract)
    ).rejects.toEqual(errors.notFound);
  });
});
