import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import StateLocationList from "./StateLocationList";
import StateLocationMap from "./StateLocationMap";
import Loading from "./Loading";

const StateLocationView = props => {
  const { updateName, showMap, currentLocation } = props;
  let params = useParams();
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennesee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington DC",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const URI = `/api/locations/${params.state}`;

  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorThrown, setErrorThrown] = useState(false);

  useEffect(() => {
    if (states.includes(params.state)) {
      updateName(params.state);
    }

    const getData = async () => {
      setIsLoading(true);
      setErrorThrown(false);
      try {
        const result = await axios.get(URI);
        setLocations(result.data);
        setIsLoading(false);
      } catch (error) {
        props.triggerAlert("error", error.response.data.msg);
        setIsLoading(false);
        setErrorThrown(true);
      }
    };
    getData();
    window.scrollTo(0, 0);
  }, [params.state]);

  const getComponentToShow = () => {
    if (isLoading) return <Loading />;

    if (errorThrown) return <ErrorPage />;

    if (showMap)
      return (
        <StateLocationMap
          locations={locations}
          currentLocation={currentLocation}
        />
      );

    return (
      <div className="content-container">
        <StateLocationList locations={locations} />
      </div>
    );
  };

  return !states.includes(params.state) ? <ErrorPage /> : getComponentToShow();
};

export default StateLocationView;
