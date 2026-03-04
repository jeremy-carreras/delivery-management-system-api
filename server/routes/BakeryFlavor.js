const express = require('express');
const router = express.Router();

const getAll = require('../controller/BakeryFlavor/getAll');
const getById = require('../controller/BakeryFlavor/getById');
const create = require('../controller/BakeryFlavor/create');
const update = require('../controller/BakeryFlavor/update');
const remove = require('../controller/BakeryFlavor/remove');

router.get('/bakery-flavors', (req, res) =>
  getAll().then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.get('/bakery-flavors/:id', (req, res) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.post('/bakery-flavors', (req, res) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.put('/bakery-flavors/:id', (req, res) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.delete('/bakery-flavors/:id', (req, res) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);

module.exports = router;
