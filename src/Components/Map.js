import React, { useEffect,useState } from 'react';
import axios from 'axios';

import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

const Map = ({ coords,setCoords}) => {

  const [weatherDetail,setWeatherDetail] = useState([]);

  useEffect(()=>{

      const getWeatherData = async (lat, lng) => {
       
          try {
            if (lat && lng) {
              const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
                params: { lat, lon: lng,cnt: '20' },
                headers: {
                  'x-rapidapi-key': 'f02034c140msh22b4c1a3cae33f5p1c261cjsn7d30579825d2',
                  'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                },
              });

              return data;
            }
          } catch (error) {
            console.log(error.message);
          }
        };

        getWeatherData(coords.lat, coords.lng)
        .then((data) => {
          // let {list} = data;
          setWeatherDetail(data?.list);
          console.log(data);
        });


  },[coords.lat, coords.lng]);



  return (
    <div className="map">
       <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBuLyPx5hyHLv6qrxgqONmJ1MTVqhetUlI' }}
        center={coords}
        defaultZoom={10}
        onChange={(e)=>{
          setCoords({ lat: e.center.lat, lng: e.center.lng });
        }}
      >

         {weatherDetail?.map((place,i)=>(
          <div key={i} lat={place.coord.lat} lng={place.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${place.weather[0].icon}.png`} height="70px" alt=""/>
          </div>          
         ))}

        <LocationMarker lat={coords.lat} lng={coords.lng} />
      </GoogleMapReact>

    </div>
  )
}


export default Map;
