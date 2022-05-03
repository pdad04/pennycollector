import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import {IoMapOutline, IoAddSharp, IoListOutline} from "react-icons/io5";
import "./Navbar.css";

const Navbar = ({state}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getNavText = () => {
    if(location.pathname === "/") return "Penny Collector";
    if(location.pathname === "/addLocation") return "Add Location";

    return state
  }

  return (
    <nav className="location-nav">
      {location.pathname === "/map" ? <div className="nav-icon" onClick={() => navigate(-1)}><IoListOutline /></div> : <div className="nav-icon" onClick={() => navigate("/map")}><IoMapOutline /></div>}
      <div>{getNavText()}</div>
      <div className="nav-icon" onClick={() => navigate("/addLocation")}><IoAddSharp /> </div>
    </nav>
  )
}

export default Navbar