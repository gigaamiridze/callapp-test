import { Router } from 'express';
import { getAllUsers, getUserById, createUser } from '../controllers';

export const userRouter = Router();

userRouter.route('/users')
  .get(getAllUsers)
  .post(createUser);

userRouter.get('/users/:id', getUserById);