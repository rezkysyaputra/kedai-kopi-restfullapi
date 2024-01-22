import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import userController from '../controller/userController.js';
import addressController from '../controller/addressController.js';
import cartController from '../controller/cartController.js';
import orderController from '../controller/orderController.js';
const userRouter = new express.Router();
userRouter.use(authMiddleware);

// USER API
userRouter.get('/users/current', userController.get);
userRouter.patch('/users/current', userController.update);
userRouter.delete('/users/logout', userController.logout);

// ADDRESS API
userRouter.post('/addresses', addressController.create);
userRouter.patch('/addresses/:addressId', addressController.update);
userRouter.get('/addresses/:addressId', addressController.get);
userRouter.get('/addresses', addressController.list);
userRouter.delete('/addresses/:addressId', addressController.remove);

// CART API

userRouter.post('/products/:productId/carts', cartController.add);
userRouter.get('/carts', cartController.list);
userRouter.patch('/carts', cartController.update);
userRouter.delete('/carts', cartController.remove);

// ORDER API
userRouter.post('/orders', orderController.create);
userRouter.get('/orders/:orderId', orderController.get);
userRouter.patch('/orders/:orderId', orderController.update);
userRouter.get('/orders', orderController.list);
userRouter.delete('/orders/:orderId', orderController.remove);

export { userRouter };
