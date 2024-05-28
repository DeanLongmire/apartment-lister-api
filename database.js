const { MongoClient } = require('mongodb');
const uri = require("./atlas_uri");

console.log(uri);

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: false,
    tlsAllowInvalidCertificates: true, // Use true if you want to disable certificate validation (not recommended for production)
  });
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