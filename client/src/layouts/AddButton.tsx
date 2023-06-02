import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

function AddButton() {
  return (
    <Button type='primary' icon={<UserAddOutlined />} />
  )
}

export default AddButton;