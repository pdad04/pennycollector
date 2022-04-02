import {useState} from "react";
import "./App.css";
import Home from "./components/Home"
import StateLocationList from "./components/StateLocationList";

function App() {
  const [stateName, setStateName] = useState(null);

  const updateStateName = (e) => {
    setStateName(e.target.dataset.state);
  }

  return (
    <div className="main-container">
      {stateName ? <StateLocationList stateName={stateName} /> : <Home stateName={stateName} updateStateName={updateStateName}/>}
    </div>
  );
}

export default App;
