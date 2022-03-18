const express = require("express");
const db = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({extended: false}));

app.get("/", (req, res) => res.send("API RUNNING"));

app.use("/api/locations", require("./routes/api/locations"));

db.initDb((error, db) => {
  if(error){
    console.error(error);
  }
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})