const express = require('express');
const router = express.Router();

const getAll = require('../controller/Order/getAll');
const getById = require('../controller/Order/getById');
const create = require('../controller/Order/create');
const update = require('../controller/Order/update');
const remove = require('../controller/Order/remove');

router.get('/orders', (req, res) =>
  getAll(req.query.phone).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.get('/orders/:id', (req, res) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.post('/orders', (req, res) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.put('/orders/:id', (req, res) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.delete('/orders/:id', (req, res) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);

module.exports = router;
