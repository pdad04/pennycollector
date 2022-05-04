import React, {useEffect, useState} from 'react'
import { useParams, useLocation, Outlet } from 'react-router-dom'
import axios from "axios";
import ErrorPage from "./ErrorPage";
import Pagination from './Pagination';
// import "./StateLocationList.css";
import StateLocationListTwo from './StateLocationListTwo';
import StateLocationMap from './StateLocationMap';

const StateLocationList = (props) => {
  let params = useParams();
  const states = ["Alabama", "Alaska", "Arizona", "Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennesee","Texas","Utah","Vermont","Virginia","Washington DC","Washington","West Virginia","Wisconsin","Wyoming"];
  const URI = `/api/locations/${params.state}`;
  // const entriesPerPage = 20;

  const [locations, setLocations] = useState([]);
  // const [paginationStart, setPaginationStart] = useState(0);
  // const [searchText, setSearchText] = useState(null);
  // const [isFiltered, setIsFiltered] = useState(false);
  
  // let filteredLocationsLength;

  
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
        
      }
    }
    getData();
    window.scrollTo(0,0);

  },[params.state]);


  // const getLocationsToShow = (city) => {
  //   locations.sort((a,b) => a.city > b.city);
    
  //   if(city){
  //     const filteredLocations = locations.filter(location => location.city.toLowerCase().startsWith(city.toLowerCase()));
  //     filteredLocationsLength = filteredLocations.length;
  //     return filteredLocations;
  //   }
  //   return locations;
  // }

  // const incrementPagination = (pageNumber) => {
  //  setPaginationStart(pageNumber * 20 - entriesPerPage)
  // }

  // const onChange = (e) => {
  //   if(e.target.value.length !== 0 && !isFiltered) setIsFiltered(true)
  //   if(e.target.value.length === 0 && isFiltered) setIsFiltered(false);
  //   setSearchText(e.target.value);
  // }

  const getComponentToShow = () => {
    if(props.showMap){
      return <StateLocationMap locations={locations} />
    }
    return <StateLocationListTwo locations={locations} />
  }

  return (
    !states.includes(params.state) 
      ? 
        <ErrorPage /> 
      : 
        <div>
          {getComponentToShow()}
        </div>
  )
}

export default StateLocationList