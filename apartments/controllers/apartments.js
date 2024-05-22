const { ObjectId } = require("mongodb");
const { client, dbname } = require("../../database.js");

const apartmentCollection = client.db(dbname).collection("apartments");

const getApartments = async(req, res) => {
    let allApartmentsCursor = await apartmentCollection.find();
    let allApartments = await allApartmentsCursor.toArray();

    res.status(200).send(allApartments);
}

module.exports = { getApartments };