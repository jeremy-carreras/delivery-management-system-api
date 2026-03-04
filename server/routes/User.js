const express = require('express');
const router = express.Router();

const getAll = require('../controller/User/getAll');
const getById = require('../controller/User/getById');
const create = require('../controller/User/create');
const update = require('../controller/User/update');
const remove = require('../controller/User/remove');

const handle = (fn) => (req, res) =>
  fn(...[].concat(fn.length > 1 ? [req.params.id || req.query.id, req.body] : []))
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err.message }));

router.get('/users', (req, res) =>
  getAll().then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.get('/users/:id', (req, res) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.post('/users', (req, res) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.put('/users/:id', (req, res) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.delete('/users/:id', (req, res) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);

module.exports = router;
