const express = require("express");
const router = express.Router();
const db = require("../../db");

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
})

module.exports = router;