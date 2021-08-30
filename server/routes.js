const donationModel = require('../db/models/donation.model');
const sequelize = require('../db');

const DonationController = (router) => {
  router.get('/donations', async (req, res) => {
    try {
      const donations = await donationModel.findAll();
      if (!donations) {
        return res.status(404).send('No matching donation found');
      }
      return res.status(200).send(donations);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  router.get('/donations/:donation_id/', (req, res) => {
    try {
      const { donation_id: id } = req.params;
      const donation = donationModel.findOne({ where: { id } });
      if (!donation) {
        return res.status(404).send('No matching donation found');
      }
      return res.status(200).send(donation);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  router.post('/donations', async (req, res) => {
    try {
      const t = await sequelize.transaction();
      const {
        location, description, charitiesOnly, donorId
      } = req.body;
      await donationModel.create(
        {
          location,
          description,
          charitiesOnly,
          donorId,
        },
        { transaction: t }
      );
      await t.commit();
      return res.status(201).end(); // * To send back the new data here, refetch, or...?
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  router.put('/donations/:donation_id/cancel', async (req, res) => {
    try {
      const t = await sequelize.transaction();
      const { donationId: id } = req.params;
      await donationModel.update(
        { status: 'canceled' },
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );
      await t.commit();
      res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  router.put('/donations/:donation_id/claim', async (req, res) => {
    try {
      const t = await sequelize.transaction();
      const { donationId: id } = req.params;
      await donationModel.update(
        { status: 'canceled' },
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );
      await t.commit();
      res.status(201).end();
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });
};

module.exports = { DonationController };
