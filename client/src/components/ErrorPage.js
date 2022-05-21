import React from 'react'
import StateDropdown from './StateDropdown'

const ErrorPage = () => {
  return (
    <div style={{margin:"0 auto", width:"100%"}}>
      <p style={ {fontWeight:600, padding:"0 1em", textAlign:"center", fontSize:"1.5rem"}}>
        Oops!<br />There's nothing here! Please Select a state from the dropdown. 
      </p>
      <StateDropdown />
    </div>
  )
}

export default ErrorPage