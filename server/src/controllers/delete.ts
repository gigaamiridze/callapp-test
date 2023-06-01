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