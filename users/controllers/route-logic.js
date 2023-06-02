const { client, dbname } = require("../../database.js");

const usersCollection = client.db(dbname).collection("Users");

const feedback = function (email, password, callback) {
    console.log("Email: " + email);
    console.log("Password: " + password);
    callback();
}

const insertUser = async (newUser) => {
    const returned = await usersCollection.insertOne(newUser);
    return returned;
}

const buildUser = async (credentials) => {
    const newUser = {
        email: credentials.email,
        password: credentials.password
    };

    try {
        const insertedUser = await insertUser(newUser);
        console.log('User created:', insertedUser.insertedId);
        return newUser;
    } 
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

const login = (req, res) => {     
    const credentials = req.body;

    feedback(credentials.email, credentials.password, () => {
        res.send("Connected!");
    });
}

const register = async (req, res) => {
    const credentials = req.body;

    await buildUser(credentials);
    res.send("User Created");
}

module.exports = { login, register };