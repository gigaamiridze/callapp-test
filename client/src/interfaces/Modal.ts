import { FormInstance } from 'antd';
import { IUser } from './User';

export interface IUpdateModalProps {
  form: FormInstance<any>;
  selectedRow: IUser | undefined;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}