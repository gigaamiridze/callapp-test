import { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { tabTitle } from '../utils';
import { useUserStore } from '../store';
import { IColumn, IUser } from '../interfaces';
import { enlargeFirstLetter, generateColumnKeys, generateDataKeys } from '../utils';
import { AddressWrapper, ContentTitle } from '../components';

function UsersTable() {
  const { users, getUsers, deleteUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [selectedRow, setSelectedRow] = useState<IUser>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRowDoubleClick = (rowData: IUser) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  }

  const handleUpdate = () => {
    // Perform data validation if needed
    // Update the data row with the new values

    // Close the modal and reset state
    setIsModalOpen(false);
  };

  const dataSource = generateDataKeys(users);

  const handleDelete = (id: number) => {
    deleteUser(id)
      .then(response => {
        console.log(response.message);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  }

  useEffect(() => {
    setLoading(true);
    tabTitle('Users Table');
    getUsers()
      .then(returnedUsers => {
        setLoading(false);
        const firstObject = returnedUsers[0];
        const cols = [];
        let count = 0;

        for (const key in firstObject) {
          let render = (value: any) => {
            return <ContentTitle>{String(value)}</ContentTitle>
          }
          if (key === 'address') {
            render = (value: any) => {
              return (
                <AddressWrapper>
                  {Object.keys(value).map(key => (
                    <ContentTitle>{key}: {value[key]}</ContentTitle>
                  ))}
                </AddressWrapper>
              )
            }
          }
          const col = {
            title: enlargeFirstLetter(key),
            dataIndex: key,
            render: render,
          }
          cols.push(col);

          count++;
          if (count === Object.keys(firstObject).length) {
            cols.push({
              title: 'Actions',
              dataIndex: 'actions',
              render: (_: any, record: IUser) => (
                <Popconfirm
                  title='Are you sure want to delete?'
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button danger type='primary' icon={<DeleteOutlined />} />
                </Popconfirm>
              )
            });
          }
        }

        const columns = generateColumnKeys(cols);
        setColumns(columns);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        bordered
        onRow={(record) => ({
          onDoubleClick: () => handleRowDoubleClick(record),
        })}
      />
      <Modal
        title='Do you want to update user?'
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdate}
      >
        <p>{selectedRow?.id}</p>
        <p>{selectedRow?.name}</p>
        <Button 
          type='primary'
          onClick={handleUpdate}
        >
          Save
        </Button>
      </Modal>
    </>
  )
}

export default UsersTable;