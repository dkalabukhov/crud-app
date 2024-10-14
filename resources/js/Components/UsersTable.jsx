import { Space } from "antd";
import Table from 'ant-responsive-table'
import generateUniqueKey from "../Utils/generateUniqueKey";
import Button from "./UI/Button";

export default function UsersTable({ data }) {
  const normalizedData = data.map((user) => ({ ...user, key: generateUniqueKey()}));

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: 'Actions',
      key: 'actions',
      showOnResponse: true,
      showOnDesktop: true,
      render: () => {
        return(
          <Space size="small">
            <Button type='primary'>Edit</Button>
            <Button type='danger'>Delete</Button>
          </Space>
        )
      }
    }
  ]

  return (
    <Table
      antTableProps={{
        showHeader: true,
        columns: columns,
        dataSource: normalizedData,
        pagination: { position: ['bottomCenter'] }
      }}
      mobileBreakPoint={768}
    />
  )
}