import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Input.css';

export default function Input({ fetchLocations }) {
  // const latRef = useRef();
  // const lonRef = useRef();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleNearMeClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    }, (error) => {
      console.error("Error getting position: ", error);
    });
  };

  const handleSearchClick = () => {
    if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      console.error("Invalid latitude or longitude");
      return;
    }

    fetchLocations(latitude, longitude);
  };

  return (
    <div className="input-container">
      <TextField 
        label="Latitude" 
        variant="outlined" 
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <TextField 
        label="Longitude" 
        variant="outlined" 
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <Button variant="contained" onClick={handleNearMeClick}>Near Me</Button>
      <Button variant="contained" onClick={handleSearchClick}>Search</Button>
    </div>
  );
}
// console.log('****Current latitude: ', position.coords.latitude);
//       console.log('****Current longitude: ', position.coords.longitude);