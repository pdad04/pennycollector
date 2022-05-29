import React from 'react'
import StateDropdown from './StateDropdown';
import pennyMachineImg from "../images/Penny-Press-Machine.png";
import "./Home.css";

const Home = ({stateName,updateStateName}) => {
  return (
    <div className="content-container">
      <header id="home-header">
        <h1>Souvenier Penny Locations</h1>
        <div>
          <img src={pennyMachineImg} alt="" id="main-header-image" />
        </div>
      </header>
      <section className="home-content">
        <div className="custom-select">
          <StateDropdown />
        </div>
        <article id="about">
          <p>It is generally accepted that the first elongated coins in the United States began at the World’s Columbian Exposition held in Chicago, Illinois in 1892-1893.</p>
  
          <p>Here you will find crowd-sourced locations of souvenier penny machines across the United States. From the dropdown above, select the state you wish to view to see the results as a list or on a map (allow location access for best experience). If you discover a location that is not yet added you may add the location yourself for everyone else to find later.  </p>
        </article>
      </section>
    </div>
  )
}

export default Home