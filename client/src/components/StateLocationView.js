import React, {useEffect, useState, Fragment} from 'react'
import { useParams, useLocation, Outlet } from 'react-router-dom'
import axios from "axios";
import ErrorPage from "./ErrorPage";
import Pagination from './Pagination';
import StateLocationList from './StateLocationList';
import StateLocationMap from './StateLocationMap';
import Loading from "./Loading";

const StateLocationView = (props) => {
  const {updateName, showMap, currentLocation} = props;
  let params = useParams();
  const states = ["Alabama", "Alaska", "Arizona", "Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennesee","Texas","Utah","Vermont","Virginia","Washington DC","Washington","West Virginia","Wisconsin","Wyoming"];
  const URI = `/api/locations/${params.state}`;

  const [locations, setLocations] = useState([]);
  
  const pagePath = useLocation();

  useEffect(() => {
    if(states.includes(params.state)){
      props.updateName(params.state)
    }

    const getData = async () => {
      try {
        const result = await axios.get(URI);
        setLocations(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    window.scrollTo(0,0);

  },[params.state]);


  const getComponentToShow = () => {
    if(!locations.length){
      return <Loading />
    }

    if(props.showMap){
      return <StateLocationMap locations={locations} currentLocation={currentLocation} />
    }
    return <div className="content-container"><StateLocationList locations={locations} /></div>
  }

  return (
    !states.includes(params.state) ? <ErrorPage /> : getComponentToShow()
  )
}

export default StateLocationView