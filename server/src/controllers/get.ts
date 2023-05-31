import { Request, Response } from 'express';
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

    const users = JSON.parse(data);
    res.status(200).json({
      status: 'success',
      count: users.length,
      users,
    });
  });
}