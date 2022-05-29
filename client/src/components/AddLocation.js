import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./AddLocation.css";

const AddLocation = ({currentState, triggerAlert}) => {
  const states = ["Alabama", "Alaska", "Arizona", "Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennesee","Texas","Utah","Vermont","Virginia","Washington DC","Washington","West Virginia","Wisconsin","Wyoming"];

  const date = {
    day: new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`,
    month: new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date.getDate.getMonth()}`,
    year: `${new Date().getFullYear()}`
  };

  const [location, setLocation] = useState({
    name: "",
    address: "",
    city: "",
    state: currentState || "",
    website: "",
    design: "",
    lastUpdated: `${date.year}-${date.month}-${date.day}`,
    notes: ""
  });

  const [didSubmit, setDidSubmit] = useState(false);
  const [selectedState, setSelecteState] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    if(name === "state") setSelecteState(value);
    setLocation({...location, [name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);
    if(location.name === "" || location.address === "" || location.city === "" || location.state === "") return;

    try {
      const result = await axios.post("/api/locations/create", location);
      triggerAlert("success", result.data.msg)
      navigate(`/${currentState || selectedState}`)
    } catch (error) {
      triggerAlert("error", error.response.data.msg);
    }

  }

  return (
    <div className="content-container">
      <form className="form-add-location">
        <label className="form-label">Location Name</label>
        <input className="form-input" type="text" value={location.name} name="name" onChange={handleChange}  />
        {location.name === "" && didSubmit ? <div className="required">Entry Required</div> : <></>}
        <label className="form-label">Address</label>
        <input className="form-input" type="text" value={location.address} name="address" onChange={handleChange}  />
        {location.address === "" && didSubmit ? <div className="required">Entry Required</div> : <></>}
        <label className="form-label">City</label>
        <input className="form-input" type="text" value={location.city} name="city" onChange={handleChange} />
        {location.city === "" && didSubmit ? <div className="required">Entry Required</div> : <></>}
        <label className="form-label">State</label>
        <select className="form-input" name="state" value={currentState || selectedState} onChange={handleChange} >
          <option>Select State</option>
          {states.map(state => <option key={state} value={state}>{state}</option>)}
        </select>
        {location.state === "" && didSubmit ? <div className="required">Entry Required</div> : <></>}
        <label className="form-label">Website</label>
        <input className="form-input" type="url" name="website" onChange={handleChange} />
        <label className="form-label">Design</label>
        <input className="form-input" type="text" name="design" onChange={handleChange} />
        <label className="form-label">Last Updated</label>
        <input className="form-input" type="date" name="lastUpdated" value={location.lastUpdated} onChange={handleChange}  />
        <label className="form-label">Notes</label>
        <textarea className="form-textarea" rows="4" type="text" name="notes" onChange={handleChange}></textarea>
        <div className="button" onClick={handleSubmit}>Submit</div>
      </form>
    </div>
  )
}

export default AddLocation