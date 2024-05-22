const { ObjectId } = require("mongodb");
const { client, dbname } = require("../../database.js");

const apartmentCollection = client.db(dbname).collection("apartments");

const getApartments = async(req, res) => {
    let allApartmentsCursor = await apartmentCollection.find();
    let allApartments = await allApartmentsCursor.toArray();

    console.log(allApartments);

    res.status(200).send(allApartments);
}

const updateValue = async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = { name: id };

    const updateDocument = {
        $set: {
            [body.valueToUpdate]: body.value,
        }
    }

    const result = await apartmentCollection.updateOne(filter, updateDocument);

    res.status(200).send(result);
}

const deleteApartment = async(req, res) => {
    const id = req.params.id;
    const filter = { name: id };

    const result = await apartmentCollection.deleteOne(filter);

    res.status(200).send(result);
}

module.exports = { getApartments, updateValue, deleteApartment };