import { useState, useEffect } from 'react';
import { Table, Form } from 'antd';
import { tabTitle } from '../utils';
import { useUserStore } from '../store';
import { IColumn, IUser } from '../interfaces';
import { enlargeFirstLetter, generateColumnKeys, generateDataKeys } from '../utils';
import { UpdateModal, DeleteButton, AddButton, CreateModal } from '../layouts';
import { AddressWrapper, ContentWrapper, ContentTitle } from '../components';

function UsersTable() {
  const { users, getUsers } = useUserStore();
  const [updateUserForm] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [selectedRow, setSelectedRow] = useState<IUser>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const dataSource = generateDataKeys(users);

  useEffect(() => {
    setLoading(true);
    tabTitle('Users Table');
    getUsers()
      .then(response => {
        setLoading(false);
        const firstObject = response.users[0];
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
              render: (_: any, record: IUser) => <DeleteButton record={record} />,
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

  const handleRowDoubleClick = (rowData: IUser) => {
    setSelectedRow(rowData);
    updateUserForm.setFieldsValue({
      name: rowData?.name,
      email: rowData?.email,
      gender: rowData?.gender,
      city: rowData?.address?.city,
      street: rowData?.address?.street,
      phone: rowData?.phone,
    });
    setIsUpdateModalOpen(true);
  }

  return (
    <>
      <ContentWrapper>
        <AddButton setIsCreateModalOpen={setIsCreateModalOpen} />
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          bordered
          onRow={(record) => ({
            onDoubleClick: () => handleRowDoubleClick(record),
          })}
        />
      </ContentWrapper>
      <UpdateModal
        form={updateUserForm}
        selectedRow={selectedRow}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        isUpdateModalOpen={isUpdateModalOpen}
      />
      <CreateModal
        setIsCreateModalOpen={setIsCreateModalOpen}
        isCreateModalOpen={isCreateModalOpen}
      />
    </>
  )
}

export default UsersTable;