import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Locations() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`https://pinballmap.com/api/v1/locations?lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLocations(data.locations); // Assuming the response has a 'locations' field
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  return (
    <Box>
      <TextField label="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      <TextField label="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      <Button variant="contained" onClick={fetchLocations}>Search</Button>
      <Box>
        {/* Display locations here */}
        {locations.map((location, index) => (
          <Box key={index}>
            {/* Display each location. Modify as per the structure of the location data */}
            <div>{location.name}</div>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
