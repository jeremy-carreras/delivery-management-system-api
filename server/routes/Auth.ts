import { Router, Request, Response } from 'express';
const router = Router();

import login from '../controller/Auth/login';
import register from '../controller/Auth/register';

router.post('/login', (req: Request, res: Response) =>
  login(req.body).then((d) => res.status(200).json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);

router.post('/register', (req: Request, res: Response) =>
  register(req.body).then((d) => res.status(201).json(d)).catch((e: any) => res.status(400).json({ message: e.message }))
);

export default router;
