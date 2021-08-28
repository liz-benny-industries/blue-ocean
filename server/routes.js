const donationModel = require('../db/models/donation.model');
const sequelize = require('../db/');

const DonationController = (router) => {
  router.get('/donations', (req, res) => {
    const t = await sequelize;
    try {
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  router.get('/donations/:donation_id/', (req, res) => {
    try {
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  router.post('/donations', (req, res) => {
    try {
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  router.put('/donations/:donation_id/cancel', (req, res) => {
    try {
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  router.put('/donations/:donation_id/claim', (req, res) => {
    try {
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });
};

module.exports = DonationController;
