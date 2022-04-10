import React, {Fragment, useState} from 'react'
import StateDropdown from './StateDropdown';
import pennyMachineImg from "../images/Penny-Press-Machine.png";

const Home = ({stateName,updateStateName}) => {
  return (
    <>
      <header id="home-header">
        <h1>Souvenier Penny Finder</h1>
        <img src={pennyMachineImg} alt="" id="main-header-image" />
      </header>
      <section className="home-content">
        <StateDropdown />
        <article id="about">
          <p>It is generally accepted that the elongated pennies were first made during the 1892-1893 The World’s Columbian Exposition. The world’s fair was held in Chicago, Illinois to commemorate the 400th anniversary of Columbus’s discovery of the New World.</p>
  
          <p>Between May 1 and October 30, twenty million attendees would make the pilgrimage from their home to visit the city of Chicago. The exposition highlighted many historical and contemporary accomplishments in the industries, the arts, and the sciences. The fairgrounds were dubbed “The White City” because of the Renaissance-style buildings produced in white plaster, Esteemed architects from all over the United States participated in the planning of the fair described as “the greatest meeting of artists since the fifteenth century.”</p>
        </article>
      </section>
    </>
  )
}

export default Home