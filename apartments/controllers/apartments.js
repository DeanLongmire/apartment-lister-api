const { ObjectId } = require("mongodb");
const { client, dbname } = require("../../database.js");
const { urlencoded } = require("express");

const apartmentCollection = client.db(dbname).collection("apartments");

const getApartments = async(req, res) => {
    let allApartmentsCursor = await apartmentCollection.find();
    let allApartments = await allApartmentsCursor.toArray();

    console.log('GET /apartments 200');
    res.status(200).send(allApartments);
}

const updateValue = async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = { name: id };

    const updateDocument = {
        $set: {
            [body.valueToUpdate]: body.value,
            'numOfChecks': body.numOfChecks,
        }
    }

    const result = await apartmentCollection.updateOne(filter, updateDocument);

    console.log(`PATCH /apartments/${encodeURIComponent(id)} 200`);
    res.status(200).send(result);
}

const deleteApartment = async(req, res) => {
    const id = req.params.id;
    const filter = { name: id };

    const result = await apartmentCollection.deleteOne(filter);

    console.log(`DELETE /apartments/${encodeURIComponent(id)} 200`);
    res.status(200).send(result);
}

const createApartment = async(req,res) => {
    const body = req.body;
    const name = body.name;

    let apartment = {
        name: body.name,
        availability: '',
        rent: '',
        washerDryer: false,
        twoBathrooms: false,
        connectedBathrooms: false,
        porch: false,
        numOfChecks: 0
    }

    const result = await apartmentCollection.insertOne(apartment);

    console.log(`POST /apartments/${encodeURIComponent(name)} 201`);
    res.status(201).send(result);
}

module.exports = { getApartments, updateValue, deleteApartment, createApartment };