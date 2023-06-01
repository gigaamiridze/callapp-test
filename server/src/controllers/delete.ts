import { Request, Response } from 'express';
import { IUser } from '../interfaces';
import { dataPath } from '../path';
import fs from 'fs';

export const deleteAllUsers = (req: Request, res: Response) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: 'An error occurred while reading the data',
      });
    }

    const users: IUser[] = JSON.parse(data);

    fs.writeFile(dataPath, JSON.stringify([]), (err) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'An error occurred while writing the data',
        });
      } else {
        res.status(204).json({
          status: 'success',
          count: users.length,
          message: 'All users have been deleted',
        });
      }
    });
  });
}

export const deleteUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: 'An error occurred while reading the data',
      });
    }

    const users: IUser[] = JSON.parse(data);
    const userToDelete = users.find((user) => user.id === userId);

    if (!userToDelete) {
      return res.status(404).json({
        status: 'fail',
        message: `User with ID ${userId} not found`,
      });
    }

    const index = users.indexOf(userToDelete);
    users.splice(index, 1);

    fs.writeFile(dataPath, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'An error occurred while writing the data',
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: `User with ID ${userId} deleted successfully`,
        });
      }
    });
  });
}