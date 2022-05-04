import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import StateLocationList from "./components/StateLocationList";
import ErrorPage from "./components/ErrorPage";
import AddLocation from "./components/AddLocation";
import Navbar from "./components/Navbar";
import StateLocationMap from "./components/StateLocationMap";
import StateLocationListTwo from "./components/StateLocationListTwo";


function App() {
  const [stateName, setStateName] = useState("");
  const [showMap, setShowMap] = useState(false);
  
  const updateStateName = (state) => {
    setStateName(state);
  }

  const shouldShowMap = () => {
    showMap ? setShowMap(false) : setShowMap(true);
  }

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
            element={<StateLocationList
            updateName={updateStateName} 
            showMap={showMap} />} 
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
