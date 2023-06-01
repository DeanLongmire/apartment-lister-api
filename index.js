const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const uri = require("./atlas_uri");

const app = express();
const PORT = 5000;

const client = new MongoClient(uri);
const dbname = "DynProgData";

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log("Connected to " + dbname);
    }
    catch (err) {
        console.error("Error connecting to " + dbname + ": " + err);
    }
};

//Routes
const userRoutes = require('./users/users.js');

app.use(cors({
    origin: 'http://localhost:4200', //configured to accept connection from DreamTeam-v2 localhost
}));

app.use('/users',userRoutes);

connectToDatabase();
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));