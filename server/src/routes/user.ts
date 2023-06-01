import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser } from '../controllers';

export const userRouter = Router();

userRouter.route('/users')
  .get(getAllUsers)
  .post(createUser);

userRouter.route('/users/:id')
  .get(getUserById)
  .patch(updateUser);