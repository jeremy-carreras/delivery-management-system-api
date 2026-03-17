import { Router, Request, Response } from 'express';
const router = Router();

import getAll from '../controller/Product/getAll';
import getById from '../controller/Product/getById';
import create from '../controller/Product/create';
import update from '../controller/Product/update';
import remove from '../controller/Product/remove';

router.get('/products', (req: Request, res: Response) =>
  getAll().then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.get('/products/:id', (req: Request, res: Response) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.post('/products', (req: Request, res: Response) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.put('/products/:id', (req: Request, res: Response) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.delete('/products/:id', (req: Request, res: Response) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);

export default router;
