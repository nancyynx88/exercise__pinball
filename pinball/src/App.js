import React, { useState, useEffect } from 'react';
import Locations from './Locations';
import Input from './Input';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Function to fetch current location and load initial data
    const fetchInitialData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchLocations(latitude, longitude);
        }, (error) => {
          console.error("Error getting location: ", error);
          setError('Unable to retrieve your location');
          setOpenDialog(true);
        });
      } else {
        setError('Geolocation is not supported by this browser');
        setOpenDialog(true);
      }
    };

    fetchInitialData();
  }, []);

  const fetchLocations = async (latitude, longitude) => {
    setError(''); // Clear existing error
    setOpenDialog(false); // Ensure dialog is closed before starting new fetch
    
    if (!latitude || !longitude) {
      setError('Latitude and longitude are required');
      setOpenDialog(true); // Open dialog to show error
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
      setOpenDialog(true); // Open dialog to show error
      console.error('Error: ', error);
    }
  };
  

  const handleCloseDialog = () => {
    setOpenDialog(false); // Function to close the dialog
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;

// console.log('****Current latitude in App.js: ', latitude);
// console.log('****Current longitude in App.js: ', longitude);
