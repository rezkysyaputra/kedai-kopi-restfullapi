import express from 'express';
import userController from '../controller/userController.js';
import productController from '../controller/productController.js';
const publicRouter = new express.Router();

publicRouter.post('/users', userController.register);
publicRouter.post('/users/login', userController.login);

// PRODUCT API
publicRouter.get('/products', productController.list);
publicRouter.get('/products/:productId', productController.get);
export { publicRouter };
