
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [position, setPosition] = useState([-22.5597, 17.0832]);
  const [events, setEvents] = useState([]);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then(res => res.json())
      .then(setEvents);
  }, []);

  const navigateTo = (location) => {
    fetch(`http://localhost:5000/navigation?from=Gate&to=${encodeURIComponent(location)}`)
      .then(res => res.json())
      .then(data => setRoute(data.route));
  };

  return (
    <div>
      <h1>UNAM Campus Navigation</h1>
      <MapContainer center={position} zoom={17} style={{ height: "60vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>You are here.</Popup>
        </Marker>
      </MapContainer>

      <h2>Upcoming Events</h2>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            <strong>{e.name}</strong> at <em>{e.location}</em> 
            <button onClick={() => navigateTo(e.location)}>Navigate</button>
          </li>
        ))}
      </ul>

      {route.length > 0 && (
        <div>
          <h3>Navigation Instructions:</h3>
          <ol>
            {route.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
