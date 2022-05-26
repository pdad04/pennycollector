import React, {useState} from 'react';
import dayjs from "dayjs";
import Pagination from './Pagination';
import "./StateLocationList.css";

function StateLocationListTwo({locations}) {
  const [paginationStart, setPaginationStart] = useState(0);
  const [searchText, setSearchText] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  let filteredLocationsLength;
  const entriesPerPage = 20;

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
    <div className="list-data">
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
                          <td>{location.address || "Not Provided"}</td>
                          <td>{location.city || 'Not Provided'}</td>
                          <td>{dayjs(location.lastUpdated).format() === "Invalid Date" ? "Not Provided" :  dayjs(location.lastUpdated).format("M/DD/YY")}</td>
                          <td>{location.design || "Not Provided"}</td>
                          <td>{location.notes || "Not Provided"}</td>
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
  )
}

export default StateLocationListTwo