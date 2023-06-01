import { IUser } from './User';

export interface IGetData {
  status: string;
  count: number;
  users: IUser[];
}