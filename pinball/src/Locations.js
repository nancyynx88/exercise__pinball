import React from 'react';
import Box from '@mui/material/Box';

export default function Locations({ locations }) {
  return (
    <Box>
      {locations.map((location, index) => (
        <Box key={index}>
          <div>{location.name}</div>
        </Box>
      ))}
    </Box>
  );
}
