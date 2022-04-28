import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import ErrorPage from "./ErrorPage";
import Navbar from "./Navbar";
import Pagination from './Pagination';
import "./StateLocationList.css";

const StateLocationList = (props) => {
  let params = useParams();
  const states = ["Alabama", "Alaska", "Arizona", "Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennesee","Texas","Utah","Vermont","Virginia","Washington DC","Washington","West Virginia","Wisconsin","Wyoming"];
  const URI = `/api/locations/${params.state}`;
  const entriesPerPage = 20;

  const [locations, setLocations] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [paginationStart, setPaginationStart] = useState(0);

  


  useEffect(() => {

    const getData = async () => {
      try {
        const result = await axios.get(URI);
        setLocations(result.data);
      } catch (error) {
        
      }
    }
    getData();
    window.scrollTo(0,0);
  },[params.state, paginationStart]);


  const getLocationsToShow = () => {
    if(false){
      return locations.filter(location => location.city === "Anaheim");
    }
    return locations.sort((a,b) => a.city > b.city);
  }

  const incrementPagination = (pageNumber) => {
   setPaginationStart(pageNumber * 20 - entriesPerPage)
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
                {getLocationsToShow().slice(paginationStart,paginationStart + entriesPerPage).map(location => { return(
                  <tr>
                    <td>{location.name || 'Not Provided'}</td>
                    <td>{location.address}</td>
                    <td>{location.city || 'Not Provided'}</td>
                    <td>{location.lastUpdated}</td>
                    <td>{location.design}</td>
                    <td>{location.notes || 'N/A'}</td>
                  </tr>
                )})}
              </tbody>
            </table>
            <Pagination
              totalItems={locations.length}
              incrementPagination={incrementPagination}
            />
          </div>
        </div>
  )
}

export default StateLocationList