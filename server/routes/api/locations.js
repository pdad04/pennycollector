const express = require("express");
const router = express.Router();
const db = require("../../db");
const axios = require("axios");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

// @route   GET api/location/:state
// @desc    return the list of places in the selected state
// @access  Public
router.get("/:state", async(req, res) => {
  try {
    const locations = await db.getDb().db("locations").collection(req.params.state).find({});
    const places = await locations.toArray();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/location/create
// @desc    create a new place in the given state and add to DB
// @access  Public
router.post("/create", async(req, res) => {
  const {name, address,city,state,zip,design,lastUpdate,notes} = req.body;
  const addrssQueryString = new URLSearchParams(`name=${address} ${city} ${state}`);
  const createLocation = {
    name: name,
    address: address,
    location: {
      type: "Point",
      coordinates: []
    },
    city: city,
    state: state,
    design: design,
    lastUpdated:lastUpdate,
    notes: notes
  }
 
  // Geocode address
  try {
    const result = await axios.get(`${process.env.GEOAPIURL}${addrssQueryString}&format=json&${process.env.GEOAPIKEY}`);

    if(result.status === 200){
      const {lat,lon} = result.data.results[0]
      createLocation.location.coordinates = [lon,lat];
    }  
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 500, msg:"There was an error retreiving location"})
  }

  // Add new location to DB.
  try {
    const newLocation = await db.getDb().db("locations").collection(state).insertOne(createLocation);
    res.status(200).json({msg: "Location created!"});

  } catch (error) {
    console.error(error);
    res.status(500).json({status: 500, msg:'There was an error saving location'});
    
  }
})

router.patch("/update/:state/:id", async(req, res) => {
  const collection = req.params.state;
  const locationToUpdate = {_id: ObjectId(req.params.id)}

  const updateDocument = {
    $set: req.body
  };

  try {
    const update = await db.getDb().db("locations").collection(collection).updateOne(locationToUpdate, updateDocument);

    res.status(200).json({msg: "Location succesfully updated!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: "Location update failed"})
  }
});

module.exports = router;