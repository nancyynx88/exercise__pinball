import * as React from 'react';
// import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState }  from 'react';

export default function Input() {
    const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locations, setLocations] = useState([]);

  const handleNearMeClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      // Optionally, make an API call here if you want to fetch data as soon as the user clicks "Near Me"
    }, (error) => {
      console.error("Error getting position: ", error);
    });
  };

  const handleSearchClick = () => {
    // Make API call to Pinball Map API with latitude and longitude
    // Example: fetch(`https://pinballmap.com/api/v1/locations?lat=${latitude}&lon=${longitude}`)
    // Then update the `locations` state with the response
  };
  return (
    <div>
      <TextField label="Latitude" variant="outlined" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      <TextField label="Longitude" variant="outlined" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      <Button variant="contained" onClick={handleNearMeClick}>Near Me</Button>
      <Button variant="contained" onClick={handleSearchClick}>Search</Button>
      {/* Display locations here */}
    </div>
  );
}
