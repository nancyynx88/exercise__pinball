import React, { useState } from 'react';
import Locations from './Locations';
import Input from './Input';
import Typography from '@mui/material/Typography';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    if (!latitude || !longitude) {
      console.error('Latitude and longitude are required');
      return;
    }

    try {
      console.log('****Current latitude in App.js: ', latitude);
      console.log('****Current longitude in App.js: ', longitude);
      const url = `https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('***current locations: ', data.locations);
      setLocations(data.locations); // Adjust based on actual API response
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div>
      <div className='Head'>
        <Typography variant='h4' component='h1' gutterBottom>
          Find the Closest Pinball Near Me
        </Typography>
      </div>
      <Input
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        fetchLocations={fetchLocations}
      />
      <Locations locations={locations} />
    </div>
  );
}

export default App;
