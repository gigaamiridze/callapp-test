import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers';

export const userRouter = Router();

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);