import React from 'react';
import './Locations.css';

export default function Locations({ locations }) {
  console.log("Locations in component in locations.js:", locations); 

  return (
    <div className="locations-container">
      {locations.map((location, index) => (
        <div key={index} className="location-item">
          {/* Display location details here */}
          <div>{location.name}</div>
        </div>
      ))}
    </div>
  );
}
