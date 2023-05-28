const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

//Routes
const userRoutes = require('./users/users.js');

app.use(cors({
    origin: 'http://localhost:4200', //configured to accept connection from DreamTeam-v2 localhost
}));

app.use('/users',userRoutes);

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));