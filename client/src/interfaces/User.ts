import { IDeleteData } from './Endpoint';

export interface IUser {
  id?: number | undefined;
  name?: string | undefined;
  email?: string | undefined;
  gender?: string | undefined;
  address?: IAddress;
  phone?: string | undefined;
}

export interface IUserStore {
  users: IUser[];
  getUsers: () => Promise<IUser[]>;
  createUser: (user: IUser) => Promise<void>;
  updateUser: (id: number, user: IUser) => Promise<void>;
  deleteUser: (id: number) => Promise<IDeleteData>;
}

interface IAddress {
  street: string | undefined;
  city: string | undefined;
}