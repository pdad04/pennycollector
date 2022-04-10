import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import ErrorPage from "./ErrorPage";
import Navbar from "./Navbar";
import "./StateLocationList.css";

const StateLocationList = (props) => {
  let params = useParams();
  const states = ["Alabama", "Alaska", "Arizona", "Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennesee","Texas","Utah","Vermont","Virginia","Washington DC","Washington","West Virginia","Wisconsin","Wyoming"];
  const URI = `/api/locations/${params.state}`;
  // const {populateLocations} = props;
  const [locations, setLocations] = useState([]);
  


  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    try {
      const result = await axios.get(URI);
      setLocations(result.data);
      // populateLocations(result.data);
    } catch (error) {
      
    }

  }

  return (
    !states.includes(params.state) 
      ? 
        <ErrorPage /> 
      : 
        <div>
            <Navbar
              state={params.state}
            />
          <div className="content-container">
            {locations.map(location => {
              return(
                <div className="card">
                  <div className="card__entry"><span className="label">Name:</span> {location.name}</div>
                  <div className="card__entry"><span className="label">Address:</span> {location.address}, {location.city}</div>
                  <div className="card__entry"><span className="label">Design:</span> {location.design}</div>
                  <div className="card__entry"><span className="label">Last Updated:</span>{location.lastUpdated}</div>
                </div>
              )
            })}
          </div>
        </div>
  )
}

export default StateLocationList