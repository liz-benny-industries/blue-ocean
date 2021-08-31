const sequelize = require('../../db');

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
      const { user: userModel } = connection.models;
      const {
        isIndividual, username, email
      } = req.body;
      const defaultLocation = req.body.defaultLocation || null;

      const newUser = await userModel.create({
        id: uid,
        isIndividual,
        username,
        email,
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

module.exports = UserController;
