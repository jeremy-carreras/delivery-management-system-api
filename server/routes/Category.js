const express = require('express');
const router = express.Router();

const getAll = require('../controller/Category/getAll');
const getById = require('../controller/Category/getById');
const create = require('../controller/Category/create');
const update = require('../controller/Category/update');
const remove = require('../controller/Category/remove');

router.get('/categories', (req, res) =>
  getAll().then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.get('/categories/:id', (req, res) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.post('/categories', (req, res) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.put('/categories/:id', (req, res) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.delete('/categories/:id', (req, res) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);

module.exports = router;
