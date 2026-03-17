import { Router, Request, Response } from 'express';
const router = Router();

import getAll from '../controller/OrderItem/getAll';
import getById from '../controller/OrderItem/getById';
import create from '../controller/OrderItem/create';
import update from '../controller/OrderItem/update';
import remove from '../controller/OrderItem/remove';

router.get('/order-items', (req: Request, res: Response) =>
  getAll().then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.get('/order-items/:id', (req: Request, res: Response) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.post('/order-items', (req: Request, res: Response) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.put('/order-items/:id', (req: Request, res: Response) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.delete('/order-items/:id', (req: Request, res: Response) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);

export default router;
