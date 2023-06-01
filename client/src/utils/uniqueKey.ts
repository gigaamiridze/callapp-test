import { IColumn, IUser } from '../interfaces';

// Generate unique keys for table columns
export const generateColumnKeys = (columns: IColumn[]) => {
  return columns.map((column, index) => {
    return {...column, key: `column-${index}`};
  });
};

// Generate unique keys for table data source
export const generateDataKeys = (users: IUser[]) => {
  return users.map((user, index) => {
    return {...user, key: `row-${index}`};
  });
};