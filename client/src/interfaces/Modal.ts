import { FormInstance } from 'antd';
import { IUser } from './User';

export interface IUpdateModalProps {
  form: FormInstance<any>;
  selectedRow: IUser | undefined;
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateModalOpen: boolean;
}

export interface ICreateModalProps {
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreateModalOpen: boolean;
}