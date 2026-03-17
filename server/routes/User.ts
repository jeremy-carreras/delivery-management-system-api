import { Router, Request, Response } from 'express';
const router = Router();

import getAll from '../controller/User/getAll';
import getById from '../controller/User/getById';
import create from '../controller/User/create';
import update from '../controller/User/update';
import remove from '../controller/User/remove';

const handle = (fn) => (req: Request, res: Response) =>
  fn(...[].concat(fn.length > 1 ? [req.params.id || req.query.id, req.body] : []))
    .then((data) => res.status(200).json(data))
    .catch((err: any) => res.status(400).json({ message: err.message }));

router.get('/users', (req: Request, res: Response) =>
  getAll().then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.get('/users/:id', (req: Request, res: Response) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.post('/users', (req: Request, res: Response) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.put('/users/:id', (req: Request, res: Response) =>
  update(req.params.id as string, req.body).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.delete('/users/:id', (req: Request, res: Response) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);

export default router;
