/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  Typography,
} from '@material-ui/core';

const Logo = () => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
    <Typography style={{ marginRight: '1rem' }} variant="h3">Lendl Global</Typography>
    <Typography style={{ fontStyle: 'italic' }} variant="h6">We're in Everything</Typography>
  </div>
);

export default Logo;
