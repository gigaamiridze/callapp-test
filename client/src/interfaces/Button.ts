import { IUser } from '../interfaces';

export interface IDeleteButtonProps {
  record: IUser;
}

export interface IAddButtonProps {
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}