import React from 'react';
import './Locations.css';

export default function Locations({ locations }) {
  console.log("Locations in component in locations.js:", locations); 
  if (locations.length === 0) {
    return null; // Don't render the container if there are no locations
  }
  return (
    <div className="locations-container">
      <h2 className="locations-title">Nearby Pinball Locations</h2>
      {locations.map((location, index) => (
        <div key={index} className="location-item">
          {/* Display location details here */}
          <div>{location.name}</div>
        </div>
      ))}
    </div>
  );
}
