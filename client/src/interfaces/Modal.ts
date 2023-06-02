import { IUser } from './User';

export interface IUpdateModalProps {
  selectedRow: IUser | undefined;
  setInputValues: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  inputValues: IUser | undefined;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}