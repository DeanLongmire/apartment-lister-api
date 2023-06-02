const { connectToDatabase, client, dbname } = require("./database.js");
const usersCollection = client.db(dbname).collection("Users");

const sampleUser = {
    username: "Deanathan",
    password: "password",
    email: "email@gmail.com",
    firstName: "Dean"
};

const testInsert = async () => {
    await connectToDatabase();
    let result = await usersCollection.insertOne(sampleUser);
    console.log("Added account with id: " + result.insertedId);
}

testInsert();
