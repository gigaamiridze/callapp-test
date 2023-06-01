export interface IColumn {
  title: string;
  dataIndex: string;
  render: (value: any) => JSX.Element;
}