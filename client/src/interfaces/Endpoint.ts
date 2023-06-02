import { IUser } from './User';

export interface IGetData {
  status: string;
  count: number;
  users: IUser[];
}

export interface IDeleteData {
  status: string;
  message: string;
}

export interface IUpdateData {
  status: string;
  user: IUser;
}