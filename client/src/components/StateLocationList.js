import React, {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ErrorPage from "./ErrorPage";

const StateLocationList = ({stateName}) => {
  let params = useParams();

  const states = ["Alabama", "Alaska", "Arizona", "Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennesee","Texas","Utah","Vermont","Virginia","Washington DC","Washington","West Virginia","Wisconsin","Wyoming"];


  return (
    !states.includes(params.state) ? <ErrorPage /> : <div>Showing page for {params.state}</div>
    
  )
}

export default StateLocationList