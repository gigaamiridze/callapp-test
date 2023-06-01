export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: IAddress;
  phone: string;
}

export interface IUserStore {
  users: IUser[];
  getUsers: () => Promise<IUser[]>;
  createUser: (user: IUser) => Promise<void>;
  updateUser: (id: number, user: IUser) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

interface IAddress {
  street: string;
  city: string;
}