import React from 'react'
import "./StateDropdown.css"

const StateDropdown = ({updateStateName, state}) => {
  const states = ["Alabama", "Alaska", "Arizona", "Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennesee","Texas","Utah","Vermont","Virginia","Washington DC","Washington","West Virginia","Wisconsin","Wyoming"];


  const handleStateSelection = (e) => {
    updateStateName(e);
  }

  return (
    <div className="custom-select">
      <select name="" id="" onChange={handleStateSelection}>
        {states.map( (stateName, idx) => 
          <option 
            value={stateName}
            key={idx}>{stateName}
          </option>
        )}
      </select>
    </div>
  )
}

export default StateDropdown