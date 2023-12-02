import React, { useState } from 'react';
import Locations from './Locations';
import Input from './Input';
import Typography from '@mui/material/Typography';
import './App.css';

function App() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

  const fetchLocations = async (latitude, longitude) => {
    setError(''); // Clear existing error
    if (!latitude || !longitude) {
      setError('Latitude and longitude are required');
      return;
    }

    try {
      // Fetch the closest region based on latitude and longitude
      const regionResponse = await fetch(
        `https://pinballmap.com/api/v1/regions/closest_by_lat_lon.json?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`
      );
      if (!regionResponse.ok) {
        throw new Error(`HTTP error! status: ${regionResponse.status}`);
      }
      const regionData = await regionResponse.json();

      // Fetch locations in the found region
      if (regionData && regionData.region && regionData.region.name) {
        const locationsResponse = await fetch(
          `https://pinballmap.com/api/v1/region/${regionData.region.name}/locations.json`
        );
        if (!locationsResponse.ok) {
          throw new Error(`HTTP error! status: ${locationsResponse.status}`);
        }
        const locationsData = await locationsResponse.json();
        setLocations(locationsData.locations);
      } else {
        throw new Error('Region data is not available. Please check your coordinates and try again.');
      }
    } catch (error) {
      setError(`Error fetching locations: ${error.message}`);
      console.error('Error: ', error);
    }
  };

  return (
    <div>
      <div className='App-container'>
        <Typography variant='h4' component='h1' gutterBottom>
          Pinball Finder: Discover Nearby Loctions
        </Typography>
        <div className='instruction-text'>
          <p>
            Enter coordinates (latitude -90 to 90, longitude -180 to 180) and
            click 'Search'.
          </p>
          <p>Or use 'Near Me' to auto-fill with your current location.</p>
        </div>
      </div>

      <Input fetchLocations={fetchLocations} />
      <div className = 'locaiton-box'>
        <Locations locations={locations} />
      </div>

      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default App;

// console.log('****Current latitude in App.js: ', latitude);
// console.log('****Current longitude in App.js: ', longitude);
