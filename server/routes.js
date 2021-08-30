const sequelize = require('../db');

// * example googleId: AiprFavvEEePTwTSooHpgK7OA832

const DonationController = (router, connection) => {
  /* Donations - Get All */
  router.get('/donations', async (req, res) => {
    try {
      const { donation: donationModel } = connection.models;
      const newDonations = await donationModel.findAll();
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
  router.get('/donations/:donationId', async (req, res) => {
    try {
      const { donation: donationModel } = connection.models;
      const { donationId: id } = req.params;
      const newDonation = await donationModel.findOne({
        where: { id },
      });
      if (!newDonation) {
        return res.status(404).send('No matching donation found');
      }
      return res.status(200).send(newDonation);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  /* Donations - Get All by DonorId */

  router.get('/donations/:donorId', (req, res) => {});

  /* Donations - Post */
  router.post('/donations', async (req, res) => {
    try {
      const { donation: donationModel, image: imageModel } = connection.models;
      const t = await sequelize.transaction();
      const {
        location,
        description,
        charitiesOnly,
        donorId,
        images,
      } = req.body;
      const newDonation = await donationModel.create(
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
        : await imageModel.create(
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
  router.put('/donations/:donationId/cancel', async (req, res) => {
    try {
      const { donation: donationModel } = connection.models;
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
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  /* Donations - Claim */
  router.put('/donations/:donationId/claim', async (req, res) => {
    try {
      const { donation: donationModel } = connection.models;
      const t = await sequelize.transaction();
      const { donationId: id } = req.params;
      await donationModel.update(
        { status: 'claimed' },
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

  router.delete('/donations/:donationId', async (req, res) => {
    try {
      const { donation: donationModel } = connection.models;
      const { donationId: id } = req.params;
      await donationModel.destroy({ where: { id } });
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  /* Donations - Add Image to Existing Donation */
  router.post('/donations/:donationId/image', async (req, res) => {
    try {
      const { image: imageModel } = connection.models;
      const t = await sequelize.transaction();
      const { image: url } = req.body;
      const { donationId } = req.params;
      await imageModel.create(
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

const UserController = (router, connection) => {
  router.get('/users', async (req, res) => {
    try {
      const { user: userModel } = connection.models;
      const users = await userModel.findAll();
      if (!users) {
        return res.status(404).send('No matching donation found');
      }
      return res.status(200).send(users);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  router.get('/users/:user_id', async (req, res) => {
    try {
      const { user: userModel } = connection.models;
      const { user_id: id } = req.params;
      const user = await userModel.findOne({ where: { id } });
      if (!user) {
        return res.status(404).send('No matching user found');
      }
      return res.status(200).send(user);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  router.post('/users', async (req, res) => {
    try {
      const { user: userModel } = connection.models;
      const {
        isIndividual, username, email, googleId
      } = req.body;
      const defaultLocation = req.body.defaultLocation || null;
      const newUser = await userModel.create({
        isIndividual,
        username,
        email,
        googleId,
        defaultLocation,
      });
      if (!newUser) {
        return res.status(406).send('User could not be created');
      }
      return res.status(201).send(newUser);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  router.put('/users/:user_id', async (req, res) => {
    try {
      const { user: userModel } = connection.models;
      const { fixedUser } = req.body;
      const { user_id: id } = req.params;
      const t = await sequelize.transaction();
      await userModel.update(
        {
          ...fixedUser,
        },
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

  router.delete('/users/:user_id', async (req, res) => {
    try {
      const { user: userModel } = connection.models;
      const { user_id: id } = req.params;
      await userModel.destroy({ where: { id } });
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });
};

module.exports = { DonationController, UserController };
