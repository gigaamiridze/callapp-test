import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { IAddButtonProps } from '../interfaces';

function AddButton(props: IAddButtonProps) {
  const { setIsCreateModalOpen } = props;

  return (
    <Button 
      type='primary' 
      icon={<UserAddOutlined />}
      onClick={() => setIsCreateModalOpen(true)}
     />
  )
}

export default AddButton;