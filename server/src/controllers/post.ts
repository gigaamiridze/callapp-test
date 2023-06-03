import { Request, Response } from 'express';
import { IUser } from '../interfaces';
import { dataPath } from '../path';
import fs from 'fs';

export const createUser = (req: Request, res: Response) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: 'An error occurred while reading the data',
      });
    }

    const users: IUser[] = JSON.parse(data);
    const newId = users[users.length - 1].id + 1;
    const newUser: IUser = Object.assign({ id: newId }, req.body);

    users.push(newUser);

    fs.writeFile(dataPath, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'An error occurred while writing the data',
        });
      } else {
        res.status(201).json({
          status: 'success',
          message: 'User created successfully',
          user: newUser,
        });
      }
    });
  });
}