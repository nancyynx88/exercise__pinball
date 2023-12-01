import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Input({ setLatitude, setLongitude, fetchLocations }) {

  const handleNearMeClick = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log('****Current latitude: ', position.coords.latitude);
      console.log('****Current longitude: ', position.coords.longitude);
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
      await fetchLocations(); // Fetch locations after setting coordinates
    }, (error) => {
      console.error("Error getting position: ", error);
    });
  };

  return (
    <div>
      <TextField label="Latitude" variant="outlined" onChange={(e) => setLatitude(e.target.value)} />
      <TextField label="Longitude" variant="outlined" onChange={(e) => setLongitude(e.target.value)} />
      <Button variant="contained" onClick={handleNearMeClick}>Near Me</Button>
      <Button variant="contained" onClick={fetchLocations}>Search</Button>
    </div>
  );
}
