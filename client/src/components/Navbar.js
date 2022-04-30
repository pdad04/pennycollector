import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import {IoMapOutline, IoAddSharp} from "react-icons/io5";
import "./Navbar.css";

const Navbar = ({state}) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  
  const getNavText = () => {
    if(location.pathname === "/") return "Penny Collector";
    if(location.pathname === "/addLocation") return "Add Location";

    return state
  }

  return (
    <nav className="location-nav">
        <div className="nav-icon"><IoMapOutline /></div>
        <div>{getNavText()}</div>
        <div className="nav-icon" onClick={() => navigate("/addLocation")}><IoAddSharp /> </div>
    </nav>
  )
}

export default Navbar