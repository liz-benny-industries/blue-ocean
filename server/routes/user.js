const { getDistance } = require('../utils');

const UserController = (router, connection) => {
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
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }
    const { uid } = req.user;
    try {
      const t = await connection.transaction();
      const {
        user: userModel,
        donation: donationModel,
        distance: distanceModel,
      } = connection.models;
      const { isIndividual, username, email } = req.body;
      const defaultLocation = req.body.defaultLocation || null;

      const newUser = await userModel.create(
        {
          id: uid,
          isIndividual,
          username,
          email,
          defaultLocation,
        },
        { transaction: t }
      );

      if (!newUser) {
        return res.status(406).send('User could not be created');
      }
      await newUser.save();

      const donations = await donationModel.findAll({});
      const { id: userId, defaultLocation: userLocation } = newUser;

      if (userLocation) {
        /* eslint-disable no-await-in-loop */
        for (let i = 0; i < donations.length; i += 1) {
          const { id: donationId, location: donationLocation } = donations[i];
          const [text, value] = await getDistance(
            userLocation,
            donationLocation
          );
          await distanceModel.create(
            {
              text,
              value,
              userId,
              donationId,
            },
            { transaction: t }
          );
        }
        /* eslint-enable no-await-in-loop */
      }
      await t.commit();
      return res.status(201).send(newUser);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  router.put('/users/:user_id', async (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }
    const { uid } = req.user;
    const { user: userModel } = connection.models;
    const { fixedUser } = req.body;
    const { user_id: id } = req.params;
    if (id !== uid) {
      return res.status(401).send('Unauthorized');
    }
    try {
      await userModel.update(
        { ...fixedUser },
        {
          where: {
            id,
          },
        }
      );
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  });

  // Need to somehow limit access here too
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

module.exports = UserController;
