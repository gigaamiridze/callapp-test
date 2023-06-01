import { Request, Response } from 'express';
import { IUser } from '../interfaces';
import { dataPath } from '../path';
import fs from 'fs';

export const updateUser = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: 'An error occurred while reading the data',
      });
    }

    const users: IUser[] = JSON.parse(data);
    const userToUpdate = users.find((user) => user.id === userId);

    if (!userToUpdate) {
      return res.status(404).json({
        status: 'fail',
        message: `User with ID ${userId} not found`,
      });
    }

    const index = users.indexOf(userToUpdate);
    const updatedUser = Object.assign(userToUpdate, req.body);

    users[index] = updatedUser;

    fs.writeFile(dataPath, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'An error occurred while writing the data',
        });
      } else {
        res.status(200).json({
          status: 'success',
          user: updatedUser,
        });
      }
    });
  });
}