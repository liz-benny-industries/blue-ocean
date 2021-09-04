const regeneratorRuntime = require('regenerator-runtime');
const { Sequelize } = require('sequelize');
const request = require('supertest')('http://localhost:3003');
const { init } = require('../server/test.index');
require('dotenv').config();

beforeAll(async () => {
  await init();
});

afterAll(() => {
  // Closing the DB connection allows Jest to exit successfully.
  // process.kill(process.pid, 'SIGTERM');
});

describe('FREE CHICKEN TEST', () => {
  test('True is true is true', () => {
    expect(true).toBe(true);
  });
});

describe('Donation Routes', () => {
  test('Blocks Unauthorized posts to Donations', async () => {
    try {
      await request.post('/donations')
        .expect(401)
        .then((response) => {
          // console.log(response);
        });
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
  test('Gets donations', async () => {
    try {
      await request.get('/donations')
        .expect(200)
        .then((response) => {
        // console.log(response);
        });
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});

describe('User Routes', () => {
  test('Posts User', async () => {
    const testUser = {
      isIndividual: true,
      username: 'Very THIICCCC Boi',
      email: 'thicboi@gmail.com',
      defaultLocation: 'Las Vegas, NV',
      user: 'testing'
    };
    // JSON.stringify(testUser);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'secret ',
    };
    try {
      await request.post('/users', testUser, { headers })
        .expect(201)
        .then((response) => {
          console.log(response.statusCode);
        });
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  test('Gets User', async () => {
    try {
      await request.get('/users')
        .expect(200)
        .then((response) => {
          console.log(response.body);
          console.log(response.statusCode);
        });
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
