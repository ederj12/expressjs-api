const app = require('../../app');
const { errors } = require('../../utils');
const request = require('supertest');

describe('Test /contracts/:1', () => {
  beforeEach(async () => {
    //seed
  });
  test('Should return contract with id 1', async () => {
    const response = await request(app)
      .get('/contracts/1')
      .set('profile_id', '1');

    const contract = response.body;

    expect(contract.id).toBe(1);
    expect(response.statusCode).toBe(200);
  });

  test('Should return not found contracts error', async () => {
    const response = await request(app)
      .get('/contracts/100')
      .set('profile_id', '1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual(errors.notFound);
  });
});
