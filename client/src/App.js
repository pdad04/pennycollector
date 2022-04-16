import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import StateLocationList from "./components/StateLocationList";
import ErrorPage from "./components/ErrorPage";
import AddLocation from "./components/AddLocation";


function App() {
  // const [stateData, setStatedata] = useState([]);

  // const populateLocations = (data) => {
  //   setStatedata(data)
  // }


  return (
    <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:state" element={<StateLocationList />} />
          <Route path="/addLocation" element={<AddLocation />} />
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
