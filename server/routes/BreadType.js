const express = require('express');
const router = express.Router();

const getAll = require('../controller/BreadType/getAll');
const getById = require('../controller/BreadType/getById');
const create = require('../controller/BreadType/create');
const update = require('../controller/BreadType/update');
const remove = require('../controller/BreadType/remove');

router.get('/bread-types', (req, res) =>
  getAll().then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.get('/bread-types/:id', (req, res) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.post('/bread-types', (req, res) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.put('/bread-types/:id', (req, res) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);
router.delete('/bread-types/:id', (req, res) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e) => res.status(400).json({ message: e.message }))
);

module.exports = router;
