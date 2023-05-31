const express = require('express');
const { login } = require("./controllers/route-logic");

const router = express.Router();
router.use(express.json());

router.post('/login', login);

module.exports = router;