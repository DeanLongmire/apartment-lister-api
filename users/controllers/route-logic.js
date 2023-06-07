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

    if(user == null)
    {
        return 'noEmail';
    }
    else
    {
        if(password == user.password)
        {
            return 'valid';
        }
        else
        {
            return 'invalid';
        }
    }
}

const login = async (req, res) => {     
    const credentials = req.body;

    const status = await validateUser(credentials.email,credentials.password);

    if(status == 'valid')
    {
        res.status(200).send("Validated");
    }
    else if(status == 'invalid')
    {
        res.status(401).send("Wrong Password");
    }
    else if(status == 'noEmail')
    {
        res.status(400).send("Email Not Found");
    }
    else
    {
        res.status(500).send("Unknown Error");
    }
}

const register = async (req, res) => {
    const credentials = req.body;

    await buildUser(credentials);
    res.send("User Created");
}

module.exports = { login, register };