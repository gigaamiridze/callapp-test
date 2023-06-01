import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { IColumn, IUser } from '../interfaces';
import { enlargeFirstLetter, generateColumnKeys, generateDataKeys } from '../utils';
import { useUserStore } from '../store';

function UsersTable() {
  const { users, getUsers } = useUserStore();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [dataSource, setDataSource] = useState<IUser[]>([]);

  useEffect(() => {
    getUsers()
      .then(returnedUsers => {
        const firstObject = returnedUsers[0];
        const cols = [];

        for (const key in firstObject) {
          let render = (value: any) => {
            return <span>{String(value)}</span>
          }
          if (key === 'address') {
            render = (value: any) => {
              return (
                <div>
                  {Object.keys(value).map(key => (
                    <span>{key}: {value[key]}</span>
                  ))}
                </div>
              )
            }
          }
          const col = {
            title: enlargeFirstLetter(key),
            dataIndex: key,
            render: render,
          }
          cols.push(col);
        }

        const columns = generateColumnKeys(cols);
        const dataSource = generateDataKeys(returnedUsers);

        setColumns(columns);
        setDataSource(dataSource);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Table 
      columns={columns} 
      dataSource={dataSource} 
    />
  )
}

export default UsersTable;