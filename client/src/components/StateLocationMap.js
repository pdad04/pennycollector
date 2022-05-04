import React, {useEffect} from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import "./StateLocationMap.css";

function StateLocationMap({locations}) {

  const createMarker = entry => {
    const coords = entry.location.coordinates;

    if(typeof coords[0] === "number" && typeof coords[1] === "number" ) {
      return <Marker position={[coords[1],coords[0]]}>
        <Popup>
          <p>{entry.name}</p>
          <p>{entry.address}</p>
        </Popup>
      </Marker>
    }
    return
  }
  return (
    <MapContainer id="map" center={[37.590,-122.021]} zoom={8} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     {locations.map(entry => createMarker(entry))}
    </MapContainer>
  )
}

export default StateLocationMap