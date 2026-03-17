import { Router, Request, Response } from 'express';
const router = Router();

import getAll from '../controller/Order/getAll';
import getById from '../controller/Order/getById';
import create from '../controller/Order/create';
import update from '../controller/Order/update';
import remove from '../controller/Order/remove';

router.get('/orders', (req: Request, res: Response) =>
  getAll(req.query.phone as string, req.query.userId as string, req.query.userRole as string)
    .then((d) => res.json(d))
    .catch((e: any) => res.status(400).json({ message: e.message }))
);
router.get('/orders/:id', (req: Request, res: Response) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.post('/orders', (req: Request, res: Response) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.put('/orders/:id', (req: Request, res: Response) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.delete('/orders/:id', (req: Request, res: Response) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);

export default router;
