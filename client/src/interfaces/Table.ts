export interface IColumn {
  title: string;
  dataIndex: string;
  render: (_: any, value: any) => JSX.Element;
}