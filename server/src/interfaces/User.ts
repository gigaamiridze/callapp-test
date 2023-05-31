export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: IAddress;
  phone: string;
}

interface IAddress {
  street: string;
  city: string;
}