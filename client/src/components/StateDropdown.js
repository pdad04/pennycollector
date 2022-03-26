import React, {useState, useEffect} from 'react'
import {IoMdArrowDropdown} from "react-icons/io";
import "./StateDropdown.css"

const StateDropdown = ({updateStateName, state}) => {
  const states = ["Alabama", "Alaska", "Arizona", "Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennesee","Texas","Utah","Vermont","Virginia","Washington DC","Washington","West Virginia","Wisconsin","Wyoming"];

  const [showList, setShowList] = useState("hide");

  const showStates = () => {
    showList === "hide" ? setShowList("show") : setShowList("hide");
  }

  const handleStateSelection = (e) => {
    showStates();
    updateStateName(e);
  }

  useEffect(() => {
    window.addEventListener("click", e => {
      if(e.target.id !== "dropdown-select__initial") {
        e.stopPropagation();
        setShowList("hide");}
    })
  }, [])

  return (
    <div className="dropdown">
      <div id="dropdown-select">
        <div onClick={showStates} id="dropdown-select__initial">{state || "Select State"} <IoMdArrowDropdown /></div>
      </div>
      <div className={`dropdown-list-${showList}`}>
        {states.map( (state,idx) => 
          <div
            className="dropdown-list__state" 
            key={idx} 
            data-state={state}
            onClick={handleStateSelection}
            >
            {state}
          </div> 
        
        )}
      </div>
    </div>
  )
}

export default StateDropdown