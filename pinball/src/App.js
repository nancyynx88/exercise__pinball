import React, { useState } from 'react';
import Locations from './Locations';
import Input from './Input';
import Typography from '@mui/material/Typography';
import './App.css';

function App() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

  const fetchLocations = async (latitude, longitude) => {
    if (!latitude || !longitude) {
      setError("Latitude and longitude are required");
      return;
    }

    try {
      // Fetch the closest region based on latitude and longitude
      const regionResponse = await fetch(`https://pinballmap.com/api/v1/regions/closest_by_lat_lon.json?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`);
      if (!regionResponse.ok) {
        throw new Error(`HTTP error! status: ${regionResponse.status}`);
      }
      const regionData = await regionResponse.json();

      // Fetch locations in the found region
      if (regionData && regionData.region && regionData.region.name) {
        const locationsResponse = await fetch(`https://pinballmap.com/api/v1/region/${regionData.region.name}/locations.json`);
        if (!locationsResponse.ok) {
          throw new Error(`HTTP error! status: ${locationsResponse.status}`);
        }
        const locationsData = await locationsResponse.json();
        setLocations(locationsData.locations);
      } else {
        throw new Error("Region data is not available");
      }
    } catch (error) {
      setError(`Error fetching locations: ${error.message}`);
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <div className="app-container">
        <Typography variant='h4' component='h1' gutterBottom>
          Find the Closest Pinball Near Me
        </Typography>
      </div>
      <Input fetchLocations={fetchLocations} />
      <Locations locations={locations} />
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default App;

// console.log('****Current latitude in App.js: ', latitude);
// console.log('****Current longitude in App.js: ', longitude);
