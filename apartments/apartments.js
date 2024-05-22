const express = require('express');
const { getApartments } = require("./controllers/apartments");

const router = express.Router();
router.use(express.json());

router.get('/', getApartments);

module.exports = router;