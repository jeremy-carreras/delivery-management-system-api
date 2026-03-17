import { Router } from 'express';
import Auth from './Auth';
import User from './User';
import Category from './Category';
import Product from './Product';
import Order from './Order';
import OrderItem from './OrderItem';
import BakeryFlavor from './BakeryFlavor';
import BreadType from './BreadType';

const router = Router();

router.use(Auth);
router.use(User);
router.use(Category);
router.use(Product);
router.use(Order);
router.use(OrderItem);
router.use(BakeryFlavor);
router.use(BreadType);

export default router;
