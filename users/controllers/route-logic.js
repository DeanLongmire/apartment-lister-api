const { client, dbname } = require("../../database.js");

const feedback = function (email, password, callback) {
    console.log("Email: " + email);
    console.log("Password: " + password);
    callback();
}

const login = (req, res) => {     
    const credentials = req.body;

    feedback(credentials.email, credentials.password, () => {
        res.send("Connected!");
    });
}

const register = (req, res) => {
    res.send("Connected");
}

module.exports = { login, register };