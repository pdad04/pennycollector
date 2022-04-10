import React from 'react'
import { Navigate } from 'react-router-dom';
import {IoMapOutline, IoAddSharp} from "react-icons/io5";
import "./Navbar.css";

const Navbar = (props) => {
  const {state} = props;
  return (
    <nav className="location-nav">
        <div><IoMapOutline /></div>
        <div>{state}</div>
        <div><IoAddSharp /></div>
    </nav>
  )
}

export default Navbar