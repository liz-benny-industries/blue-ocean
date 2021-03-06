/* eslint-disable no-unused-vars */
const Sequelize = require('sequelize');
/* eslint-disable no-console */
const { sendMail } = require('../notification');
const { getDistance, distanceExists } = require('../utils');

// * example googleId: AiprFavvEEePTwTSooHpgK7OA832

const DonationController = (router, connection) => {
  /* Donations - Get All */
  router.get('/donations', async (req, res) => {
    try {
      const {
        donation: donationModel,
        user: userModel,
        image: imageModel,
        distance: distanceModel,
      } = connection.models;

      const options = {};
      const {
        user, sortBy, orderBy, filter
      } = req.query;
      options.where = {
        status: { [Sequelize.Op.eq]: 'active' },
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${filter}%` } },
          {
            '$donor.username$': {
              [Sequelize.Op.like]: `%${filter}%`,
            },
          },
        ],
      };
      if (user) {
        if (!req.user) {
          return res
            .status(401)
            .send('Unauthorized - no valid user to sort by');
        }
        const { uid } = req.user;

        if (user === 'claimant') {
          options.where.claimantId = uid;
        } else if (user === 'donor') {
          options.where.donorId = uid;
        } else {
          return res
            .status(400)
            .send(
              'Invalid query - user must have a value of "claimant" or "donor"'
            );
        }
      }
      options.include = [
        {
          model: userModel,
          as: 'donor',
          required: true,
        },
        {
          model: imageModel,
          required: true,
        },
        {
          model: distanceModel,
          required: true,
          where: {
            donationId: { [Sequelize.Op.col]: 'donation.id' },
          },
          order: [['distance', 'value', `${orderBy}`]], // TODO: Test if this is necessary
        },
      ];

      if (sortBy) {
        if (sortBy === 'Proximity') {
          options.order = [[distanceModel, 'value', `${orderBy}`]];
        } else if (sortBy === 'Recency') {
          options.order = [['createdAt', `${orderBy}`]];
        }
      }

      // console.log('options:', options);
      const newDonations = await donationModel.findAll(options);
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

  /* Donations - Post */
  router.post('/donations', async (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }
    const { uid } = req.user;
    try {
      const {
        donation: donationModel,
        image: imageModel,
        user: userModel,
        distance: distanceModel,
      } = connection.models;
      const {
        location, description, charitiesOnly, images, title
      } = req.body;

      // images are required
      if (!images || images.length === 0) {
        return res.status(400).send('Request must include images!');
      }
      const t = await connection.transaction();
      const newDonation = await donationModel.create(
        {
          location,
          description,
          charitiesOnly,
          donorId: uid,
          title,
        },
        { transaction: t }
      );

      await newDonation.save(); // * Save so ID can be found

      /* eslint-disable no-unused-expressions */
      if (images.length > 1) {
        await imageModel.bulkCreate(
          images.map((url) => ({
            url,
            donationId: newDonation.id,
          })),
          { transaction: t }
        );
      } else if (images.length === 1) {
        await imageModel.create(
          {
            url: images[0],
            donationId: newDonation.id,
          },
          { transaction: t }
        );
      }

      const users = await userModel.findAll();

      const { id: donationId, location: donationLocation } = newDonation;
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < users.length; i += 1) {
        const { id: userId, defaultLocation: userLocation } = users[i];
        if (userLocation) {
          const distanceDoesExist = await distanceExists(
            distanceModel,
            userId,
            donationId
          );
          if (!distanceDoesExist) {
            const [text, value] = await getDistance(
              userLocation,
              donationLocation
            );
            const newDistance = await distanceModel.create(
              {
                text,
                value,
                userId,
                donationId,
              },
              { transaction: t }
            );
          }
        }
      }
      await t.commit();
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  /* Donations - Cancel */
  router.put('/donations/cancel/:donationId', async (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }
    const { uid } = req.user;
    try {
      const { donation: donationModel } = connection.models;
      const { donationId: id } = req.params;
      const { donorId } = await donationModel.findOne({
        where: { id },
      });
      if (donorId !== uid) {
        return res
          .status(401)
          .send(
            'Current user is not authorized to cancel this donation'
          );
      }
      await donationModel.update(
        { status: 'canceled' },
        { where: { id } }
      );
      return res.status(200).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  /* Donations - Claim */
  router.put('/donations/:donationId/claim', async (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }
    const { uid } = req.user;
    const { email, title } = req.query;
    const message = `
      <div>
        Someone has claimed your: ${title}! <br/>
        Please login to coordinate pick-up details!
      </div>`;

    try {
      const { donation: donationModel } = connection.models;
      const { donationId: id } = req.params;
      await donationModel.update(
        {
          status: 'claimed',
          claimantId: uid,
        },
        {
          where: {
            id,
          },
        }
      );
      sendMail(message, email);
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  // Either remove this route or limit access to it somehow
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
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }
    const { uid } = req.user;
    const { image: url } = req.body;
    const { donationId } = req.params;
    try {
      const { donation: donationModel, image: imageModel } = connection.models;
      const { donorId } = await donationModel.findOne({
        where: { id: donationId },
      });
      if (donorId !== uid) {
        return res
          .status(401)
          .send(
            'Current user is not authorized to add images to this donation'
          );
      }
      await imageModel.create({
        url,
        donationId,
      });
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });
};

module.exports = DonationController;
