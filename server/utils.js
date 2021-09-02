const axios = require('axios');
require('dotenv').config();

const getDistance = async (source, destination) => {
  const key = process.env.MAPS_API_KEY;
  const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  const params = {
    destinations: destination,
    origins: source,
    key,
    units: 'imperial',
  };

  const result = await axios.get(baseUrl, params);
  const [text, value] = result.data.rows[0].elements[0];
  return [text, value];
};

module.exports = {
  getDistance,
};
