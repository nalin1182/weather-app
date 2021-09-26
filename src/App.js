import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Components/Map';


function App() {

  const [coords,setCoords] = useState({
    lat:0,
    lng:0
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
      // console.log(latitude,longitude);
    });
  }, []);

  return (
    <div className="App">
          {coords.lng !== 0 && coords.lat !== 0 &&<Map coords={coords} setCoords={setCoords}/>}
    </div>
  );
}

export default App;
