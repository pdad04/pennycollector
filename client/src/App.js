import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import StateLocationView from "./components/StateLocationView";
import ErrorPage from "./components/ErrorPage";
import AddLocation from "./components/AddLocation";
import Navbar from "./components/Navbar";
import AlertBanner from "./components/AlertBanner";

function App() {
  const [stateName, setStateName] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([])
  const [alert, setAlert] = useState({
    type: null,
    message: null
  });
  
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
    setAlert({
      type: "warning",
      message: "For the best experiece please allow location access."
    });

    setTimeout(()=> { setAlert({
      type: null,
      message: null
    })}, 5000);
  }

  const closeAlert = () => {
    setAlert({
      type: null,
      message: null
    })
  }

  const triggerAlert = (type, message) => {
    setAlert({
      type: type,
      message: message
    });

    setTimeout(()=> { setAlert({
      type: null,
      message: null
    })}, type === "error" ? 15000 : 5000);
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
      <AlertBanner
        alert={alert}
        close={closeAlert}
      />
        <Routes>
          <Route path="/" 
            element={<Home />} 
          />
          <Route path="/:state" 
            element={<StateLocationView
            updateName={updateStateName} 
            showMap={showMap}
            currentLocation={currentLocation}
            triggerAlert={triggerAlert} />} 
          />
          <Route path="/addLocation" 
            element={<AddLocation currentState={stateName} triggerAlert={triggerAlert}/>} 
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
