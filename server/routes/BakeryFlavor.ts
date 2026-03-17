import { Router, Request, Response } from 'express';
const router = Router();

import getAll from '../controller/BakeryFlavor/getAll';
import getById from '../controller/BakeryFlavor/getById';
import create from '../controller/BakeryFlavor/create';
import update from '../controller/BakeryFlavor/update';
import remove from '../controller/BakeryFlavor/remove';

router.get('/bakery-flavors', (req: Request, res: Response) =>
  getAll().then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.get('/bakery-flavors/:id', (req: Request, res: Response) =>
  getById(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.post('/bakery-flavors', (req: Request, res: Response) =>
  create(req.body).then((d) => res.status(201).json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.put('/bakery-flavors/:id', (req: Request, res: Response) =>
  update(req.params.id, req.body).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);
router.delete('/bakery-flavors/:id', (req: Request, res: Response) =>
  remove(req.params.id).then((d) => res.json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);

export default router;
