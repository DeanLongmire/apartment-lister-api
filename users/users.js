const express = require('express');
const { login, register, getUser } = require("./controllers/users");

const router = express.Router();
router.use(express.json());

router.get('/:id', getUser);
router.post('/login', login);
router.post('/register', register);

module.exports = router;