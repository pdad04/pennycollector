import React from 'react'
import { useNavigate } from 'react-router-dom';
import {IoMapOutline, IoAddSharp} from "react-icons/io5";
import "./Navbar.css";

const Navbar = (props) => {
  const {state} = props;
  const navigate = useNavigate();
 
  return (
    <nav className="location-nav">
        <div className="nav-icon"><IoMapOutline /></div>
        <div>{state}</div>
        <div className="nav-icon" onClick={() => navigate("/addLocation")}><IoAddSharp /> </div>
    </nav>
  )
}

export default Navbar