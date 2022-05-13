import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import L from "leaflet";
import "./StateLocationMap.css";
import mapMarker from "../images/map-marker.png"

function StateLocationMap({locations, currentLocation}) {

  const icon = L.icon({
    iconUrl: "https://img.icons8.com/fluency/48/000000/map-pin.png",
    iconSize:[30,30]
  });

  const userLocation = L.icon({
    iconUrl: "https://img.icons8.com/color/48/000000/marker--v1.png",
    iconSize:[25,25]
  });

  const createMarker = entry => {
    const coords = entry.location.coordinates;

    if(typeof coords[0] === "number" && typeof coords[1] === "number" ) {
      return <Marker position={[coords[1],coords[0]]} icon={icon}>
        <Popup>
          <p>{entry.name}</p>
          <p>{entry.address}</p>
        </Popup>
      </Marker>
    }
    return
  }

  let defaultLocation;
  if(!currentLocation.length) {
    defaultLocation = [44.967243, -103.771556];
  }

  return (
    <MapContainer id="map" center={currentLocation.length ? currentLocation : defaultLocation} zoom={currentLocation.length ? 10 : 3} scrollWheelZoom={false}>
      <Marker position={currentLocation.length ? currentLocation : defaultLocation} icon={userLocation}>
        <Tooltip >You are here!</Tooltip>
      </Marker>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     {locations.map(entry => createMarker(entry))}
    </MapContainer>
  )
}

export default StateLocationMap