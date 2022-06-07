const express = require("express");
const db = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({extended: false}));

app.use("/api/locations", require("./routes/api/locations"));

const path = require("path");
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

db.initDb((error, db) => {
  if(error){
    console.error(error);
  }
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})