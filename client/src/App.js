import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import StateLocationView from "./components/StateLocationView";
import ErrorPage from "./components/ErrorPage";
import AddLocation from "./components/AddLocation";
import Navbar from "./components/Navbar";

function App() {
  const [stateName, setStateName] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([])
  
  const updateStateName = (state) => {
    setStateName(state);
  }

  const shouldShowMap = () => {
    showMap ? setShowMap(false) : setShowMap(true);
  }

  const locationSuccess = (position) => {
    const {latitude, longitude} = position.coords;
    setCurrentLocation([latitude,longitude]);
  }

  const locationError = () => {
    console.log('error');
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  },[]);

  return (
    <div className="main-container">
      <BrowserRouter>
      <Navbar 
        state={stateName}
        shouldShowMap={shouldShowMap}
        showMap={showMap}
      />
        <Routes>
          <Route path="/" 
            element={<Home />} 
          />
          <Route path="/:state" 
            element={<StateLocationView
            updateName={updateStateName} 
            showMap={showMap}
            currentLocation={currentLocation} />} 
          />
          <Route path="/addLocation" 
            element={<AddLocation currentState={stateName}/>} 
          />
          <Route
            path="*"
            element={<ErrorPage /> }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
