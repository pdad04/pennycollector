const {MongoClient} = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGOURI);
let _db;

const initDb = async(callback) => {
  if(_db){
    console.log("DB is already initialized!");
    return callback(null, _db);
  }

  try {
    _db = await client.connect();
    callback(null,_db);

  } catch (error) {
    callback(error);
  }
}

const getDb = () => {
  if(!_db){
    throw Error("Database not initialized");
  }

  return _db;
}

module.exports = {
  initDb,
  getDb
}