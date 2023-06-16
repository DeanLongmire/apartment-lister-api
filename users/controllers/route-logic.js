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

const validateUser = async (email, password) => {
    const query = { email: email };

    const user = await usersCollection.findOne(query);

    return user;
}

const login = async (req, res) => {     
    const credentials = req.body;

    /*const user = await validateUser(credentials.email,credentials.password);

    if(user != null)
    {
        let resUser = {
            id: user._id
        }
        res.status(200).send(resUser);
    }
    else if(user == null)
    {
        res.status(401).send("Invalid");
    }*/

    let testResponse = {
        id: 999999,
        firstName: 'Test',
        lastName: 'User'
    }

    if(credentials.email === '') res.status(401).send('Invalid');
    else res.status(200).send(testResponse);
}

const register = async (req, res) => {
    const credentials = req.body;

    await buildUser(credentials);
    res.send("User Created");
}

module.exports = { login, register };