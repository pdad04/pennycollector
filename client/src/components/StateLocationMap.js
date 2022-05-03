import React, {useEffect} from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import "./StateLocationMap.css";

function StateLocationMap() {
  return (
    <MapContainer id="map" center={[37.590, -122.021]} zoom={8} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
      <Marker position={[37.590, -122.021]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default StateLocationMap