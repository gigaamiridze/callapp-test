import { Request, Response } from 'express';
import { IUser } from '../interfaces';
import { dataPath } from '../path';
import fs from 'fs';

export const getAllUsers = (req: Request, res: Response) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: 'An error occurred while reading the data',
      });
    }

    const users: IUser[] = JSON.parse(data);
    res.status(200).json({
      status: 'success',
      count: users.length,
      users,
    });
  });
}

export const getUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: 'An error occurred while reading the data',
      });
    }

    const users: IUser[] = JSON.parse(data);
    const user = users.find((user) => user.id === userId);

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: `User with ID ${userId} not found`,
      });
    } else {
      res.status(200).json({ status: 'success', user });
    }
  });
}