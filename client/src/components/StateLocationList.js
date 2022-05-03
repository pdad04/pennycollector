import React, {useEffect, useState} from 'react'
import { useParams, Outlet } from 'react-router-dom'
import axios from "axios";
import ErrorPage from "./ErrorPage";
import Pagination from './Pagination';
import "./StateLocationList.css";

const StateLocationList = (props) => {
  let params = useParams();
  const states = ["Alabama", "Alaska", "Arizona", "Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennesee","Texas","Utah","Vermont","Virginia","Washington DC","Washington","West Virginia","Wisconsin","Wyoming"];
  const URI = `/api/locations/${params.state}`;
  const entriesPerPage = 20;

  const [locations, setLocations] = useState([]);
  const [paginationStart, setPaginationStart] = useState(0);
  const [searchText, setSearchText] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  
  let filteredLocationsLength;

  


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

  },[params.state, paginationStart,searchText,isFiltered]);


  const getLocationsToShow = (city) => {
    locations.sort((a,b) => a.city > b.city);
    
    if(city){
      const filteredLocations = locations.filter(location => location.city.toLowerCase().startsWith(city.toLowerCase()));
      filteredLocationsLength = filteredLocations.length;
      return filteredLocations;
    }
    return locations;
  }

  const incrementPagination = (pageNumber) => {
   setPaginationStart(pageNumber * 20 - entriesPerPage)
  }

  const onChange = (e) => {
    if(e.target.value.length !== 0 && !isFiltered) setIsFiltered(true)
    if(e.target.value.length === 0 && isFiltered) setIsFiltered(false);
    setSearchText(e.target.value);
  }

  return (
    !states.includes(params.state) 
      ? 
        <ErrorPage /> 
      : 
        <div>
          <div className="content-container">
            <div className="filter">
              <input type="text" className="filter-text" placeholder="Enter city name to filter" onChange={onChange}/>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Last Updated</th>
                  <th>Design</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {getLocationsToShow(searchText)
                  .slice(paginationStart,paginationStart + entriesPerPage)
                  .map(location => 
                    { 
                      return(
                        <tr key={location._id}>
                          <td>{location.name || 'Not Provided'}</td>
                          <td>{location.address}</td>
                          <td>{location.city || 'Not Provided'}</td>
                          <td>{location.lastUpdated}</td>
                          <td>{location.design}</td>
                          <td>{location.notes || 'N/A'}</td>
                        </tr>
                      )
                    }
                  )
                }
              </tbody>
            </table>
            <Pagination
              totalItems={isFiltered ? filteredLocationsLength : locations.length }
              incrementPagination={incrementPagination}
            />
          </div>
          <Outlet />
        </div>
  )
}

export default StateLocationList