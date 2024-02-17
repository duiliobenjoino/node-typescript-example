import { Router, Request, Response } from 'express';
import userRouter from './UserController';
import categoryRouter from './CategoryController';
import recordRouter from './RecordController';

const routes = Router();

routes.use('/users', userRouter)
routes.use('/:user_id/categories', categoryRouter)
routes.use('/:user_id/records', recordRouter)

export default routes;