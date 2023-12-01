import './App.css';
import React, { useState } from 'react';
import Locations from './Locations';
import Input from './Input';
import Typography from '@mui/material/Typography';


function App() {
  return (
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [locations, setLocations] = useState([]);
  
    const fetchLocations = async () => {
      // ... your API call logic
    };
  
    <div>
      <div className='Head'>
        <Typography variant="h4" component="h1" gutterBottom>
          Find the Closest Pinball Near Me
        </Typography>
      </div>
      <div>
      <Input
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        fetchLocations={fetchLocations}
      />
      <Locations locations={locations} />
    </div>
    </div>
  );
}

export default App;
