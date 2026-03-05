const express = require('express');
const router = express.Router();

const login = require('../controller/Auth/login');
const register = require('../controller/Auth/register');

router.post('/login', (req, res) =>
  login(req.body).then((d) => res.status(200).json(d)).catch((e) => res.status(400).json({ message: e.message }))
);

router.post('/register', (req, res) =>
  register(req.body).then((d) => res.status(201).json(d)).catch((e) => res.status(400).json({ message: e.message }))
);

module.exports = router;
