const axios = require('axios');
const regeneratorRuntime = require('regenerator-runtime');
require('dotenv').config();

const distanceExists = async (model, userId, donationId) => {
  const result = await model.findOne({
    where: { donationId, userId },
  });
  return !!result;
};

const getDistance = async (source, destination) => {
  try {
    const key = process.env.MAPS_API_KEY;
    const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    const params = {
      destinations: destination,
      origins: source,
      units: 'imperial',
      key,
    };

    const result = await axios.get(baseUrl, { params });
    const data = result.data.rows[0].elements[0];
    if (!data.distance) {
      return ['Infinity', Infinity];
    }
    const { text, value } = data.distance;
    return [text, value];
  } catch (e) {
    console.error(e);
    return ['Infinity', Infinity];
  }
};

module.exports = {
  getDistance,
  distanceExists,
};
