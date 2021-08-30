const sequelize = require('../db');

const DonationController = (router, connection) => {
  /* Donations - Get All */
  router.get('/donations', async (req, res) => {
    const { donation } = connection.models;
    try {
      const newDonations = await donation.findAll();
      if (!newDonations) {
        return res.status(404).send('No matching donation found');
      }
      return res.status(200).send(newDonations);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  /* Donations - Get One By Id */
  router.get('/donations/:donation_id/', (req, res) => {
    try {
      const { donation } = connection.models;
      const { donation_id: id } = req.params;
      const newDonation = donation.findOne({ where: { id } });
      if (!newDonation) {
        return res.status(404).send('No matching donation found');
      }
      return res.status(200).send(newDonation);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  /* Donations - Post */
  router.post('/donations', async (req, res) => {
    try {
      const { donation, image } = connection.models;
      const t = await sequelize.transaction();
      const {
        location,
        description,
        charitiesOnly,
        donorId,
        images,
      } = req.body;
      const newDonation = await donation.create(
        {
          location,
          description,
          charitiesOnly,
          donorId,
        },
        { transaction: t }
      );
      /* eslint-disable no-unused-expressions */
      images.length > 1
        ? await ImageBitmapRenderingContext.bulkCreate(
          images.map((url) => ({
            url,
            donationId: newDonation.id,
          })),
          { transaction: t }
        )
        : await image.create(
          {
            url: images[0],
            donationId: newDonation.id,
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

  /* Donations - Cancel */
  router.put('/donations/:donation_id/cancel', async (req, res) => {
    try {
      const { donation } = connection.models;
      const t = await sequelize.transaction();
      const { donationId: id } = req.params;
      await donation.update(
        { status: 'canceled' },
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );
      await t.commit();
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  /* Donations - Claim */
  router.put('/donations/:donation_id/claim', async (req, res) => {
    try {
      const { donation } = connection.models;
      const t = await sequelize.transaction();
      const { donationId: id } = req.params;
      await donation.update(
        { status: 'canceled' },
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );
      await t.commit();
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  /* Donations - Add Image to Existing Donation */
  router.put('donations/:donation_id/image', async (req, res) => {
    try {
      const { image } = connection.models;
      const t = await sequelize.transaction();
      const { image: url } = req.body;
      const { donation_id: donationId } = req.params;
      await image.create(
        {
          url,
          donationId,
        },
        { transaction: t }
      );
      await t.commit();
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });
};

// const UserController = (router) => {};

module.exports = { DonationController };
