const { MongoClient } = require('mongodb');
const uri = require("./atlas_uri");

const client = new MongoClient(uri);
const dbname = "apartment-lister";

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log("Connected to " + dbname);
    }
    catch (err) {
        console.error("Error connecting to " + dbname + ": " + err);
    }
};

module.exports = { client, dbname, connectToDatabase};