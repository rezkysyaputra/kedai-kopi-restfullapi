import express from 'express';
import { errorMiddleware } from '../middleware/errorMiddleware.js';
import { publicRouter } from '../route/publicApi.js';
import { userRouter } from '../route/api.js';

const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);

export { web };
