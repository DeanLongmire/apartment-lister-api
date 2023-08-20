const { ObjectId } = require("mongodb");
const { client, dbname } = require("../../database.js");

const usersCollection = client.db(dbname).collection("Users");

const feedback = function (email, password, callback) {
    console.log("Email: " + email);
    console.log("Password: " + password);
    callback();
}

const findUser = async (id) => {
    const query = { _id: new ObjectId(id) };
    let user;

    try {
        user = await usersCollection.findOne(query);
        console.log(user);
    } catch(error) {
        throw error;
    }

    if(user == null) {
        throw new Error("User not found");
    } else {
        return user;
    }
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

    let user = await usersCollection.findOne(query);
    console.log(user);

    if(user == null)
    {
        return user;
    }
    else
    {
        if(password == user.password)
        {
            return user;
        }
        else
        {
            user = null;
            return user;
        }
    }
}

const login = async (req, res) => {     
    const credentials = req.body;

    const user = await validateUser(credentials.email,credentials.password);

    if(user != null)
    {
        stringId = user._id.toString();
        let resUser = {
            id: stringId,
            token: 'secret token'
        }
        console.log(stringId);
        res.status(200).json(resUser);
    }
    else if(user == null)
    {
        res.status(401).send("Invalid Username or Password");
    }

    //offline testing
    /*let testResponse = {
        id: 999999,
        firstName: 'Test',
        lastName: 'User'
    }

    if(credentials.email === '') res.status(401).send('Invalid' Username or Password);
    else res.status(200).send(testResponse); */
}

const register = async (req, res) => {
    const credentials = req.body;

    await buildUser(credentials);
    res.send("User Created");
}

const getUser = async(req, res) => {
    const id = req.params.id;

    try {
        let user = await findUser(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { login, register, getUser };