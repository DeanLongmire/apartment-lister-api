const express = require('express');
const { getApartments, updateValue, deleteApartment, createApartment } = require("./controllers/apartments");

const router = express.Router();
router.use(express.json());

router.get('/', getApartments);
router.patch('/', createApartment);
router.patch('/:id', updateValue);
router.delete('/:id', deleteApartment);

module.exports = router;