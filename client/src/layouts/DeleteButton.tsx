import { Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useUserStore } from '../store';
import { IDeleteButtonProps } from '../interfaces';
import { showSuccessMessage, showErrorMessage } from '../utils';

function DeleteButton(props: IDeleteButtonProps) {
  const { record } = props;
  const { deleteUser } = useUserStore();

  const handleDelete = (id: number | undefined) => {
    deleteUser(id)
      .then(response => {
        showSuccessMessage(response.message);
      })
      .catch(error => {
        showErrorMessage(error.response.data.message);
      });
  }

  return (
    <Popconfirm
      title='Are you sure want to delete?'
      onConfirm={() => handleDelete(record.id)}
    >
      <Button danger type='primary' icon={<DeleteOutlined />} />
    </Popconfirm>
  )
}

export default DeleteButton;