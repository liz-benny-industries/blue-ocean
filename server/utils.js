const axios = require('axios');
require('dotenv').config();

const distanceExists = async (model, userId, donationId) => {
  const result = await model.findOne({
    where: { donationId, userId },
  });
  console.log('result:', result);
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
    const { text, value } = result.data.rows[0].elements[0].distance;
    return [text, value];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  getDistance,
  distanceExists,
};
