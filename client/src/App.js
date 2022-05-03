import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import StateLocationList from "./components/StateLocationList";
import ErrorPage from "./components/ErrorPage";
import AddLocation from "./components/AddLocation";
import Navbar from "./components/Navbar";
import StateLocationMap from "./components/StateLocationMap";


function App() {
  const [stateName, setStateName] = useState("");
  
  const updateStateName = (state) => {
    setStateName(state);
  }

  return (
    <div className="main-container">
      <BrowserRouter>
      <Navbar state={stateName} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:state" element={<StateLocationList updateName={updateStateName} />} />
          <Route path="/addLocation" element={<AddLocation currentState={stateName}/>} />
          <Route path="/map" element={<StateLocationMap />} />
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
