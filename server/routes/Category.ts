import { Router, Request, Response } from 'express';
const router = Router();

import getAll from '../controller/Category/getAll';
import getById from '../controller/Category/getById';
import create from '../controller/Category/create';
import update from '../controller/Category/update';
import remove from '../controller/Category/remove';

router.get('/categories', (req: Request, res: Response) =>
  getAll().then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.get('/categories/:id', (req: Request, res: Response) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.post('/categories', (req: Request, res: Response) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.put('/categories/:id', (req: Request, res: Response) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.delete('/categories/:id', (req: Request, res: Response) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);

export default router;
