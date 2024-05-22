const express = require('express');
const { getApartments, updateValue } = require("./controllers/apartments");

const router = express.Router();
router.use(express.json());

router.get('/', getApartments);
router.patch('/:id', updateValue);

module.exports = router;