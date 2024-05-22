const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require("./database.js");

const app = express();
const PORT = 5000;

//Routes
const apartmentRoutes = require('./apartments/apartments.js');

app.use(cors({
    origin: 'http://localhost:4200', //configured to accept connection from DreamTeam-v2 localhost
}));

app.use('/apartments',apartmentRoutes);

connectToDatabase();
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));