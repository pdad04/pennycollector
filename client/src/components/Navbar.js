import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import {IoMapOutline, IoAddSharp, IoListOutline} from "react-icons/io5";
import "./Navbar.css";

const Navbar = ({state, shouldShowMap,showMap}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavText = () => {
    if(location.pathname === "/") return "Penny Collector";
    if(location.pathname === "/addLocation") return "Add Location";

    return state
  }

  const displayNavbar = () => {
    if(location.pathname !== "/"){
      return (
        <nav className="location-nav">
          {showMap ? <div className="nav-icon" onClick={shouldShowMap}><IoListOutline /></div> : <div className="nav-icon" onClick={shouldShowMap}><IoMapOutline /></div>}
          <div>{getNavText()}</div>
          <div className="nav-icon" onClick={() => navigate("/addLocation")}><IoAddSharp /> </div>
        </nav>
      ) 
    }

    return (
      <nav className="location-nav">
        <div></div>
        <div>{getNavText()}</div>
        <div className="nav-icon" onClick={() => navigate("/addLocation")}><IoAddSharp /> </div>
      </nav>
    )
  }


  return displayNavbar()
}

export default Navbar