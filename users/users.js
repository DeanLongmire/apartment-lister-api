const express = require('express');
const { login, register } = require("./controllers/route-logic");

const router = express.Router();
router.use(express.json());

router.post('/login', login);
router.post('/register', register);

module.exports = router;