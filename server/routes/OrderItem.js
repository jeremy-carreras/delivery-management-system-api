const express = require('express');
const router = express.Router();

const getAll = require('../controller/OrderItem/getAll');
const getById = require('../controller/OrderItem/getById');
const create = require('../controller/OrderItem/create');
const update = require('../controller/OrderItem/update');
const remove = require('../controller/OrderItem/remove');

router.get('/order-items', (req, res) =>
  getAll().then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.get('/order-items/:id', (req, res) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.post('/order-items', (req, res) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.put('/order-items/:id', (req, res) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.delete('/order-items/:id', (req, res) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);

module.exports = router;
