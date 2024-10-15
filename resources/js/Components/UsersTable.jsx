import { Space, Table } from "antd";
import generateUniqueKey from "../Utils/generateUniqueKey";
import Button from "./UI/Button";
import { Link, useForm } from "@inertiajs/react";
import { useRoute } from '#/tightenco/ziggy';

export default function UsersTable({ data }) {
  const route = useRoute();

  const normalizedData = data.map((user) => ({ ...user, key: generateUniqueKey()}));

  const {delete: destroy} = useForm();

  const handleDelete = (e, id) => {
    e.preventDefault();
    destroy(`/users/${id}`);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'View info',
      key: 'info',
      render: (value, record) => {
        return (
          <Link href={route('users.show', record)}>
            <svg className="main__info-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="currentColor">
              <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
            </svg>
          </Link>
        )
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (value, record) => {
        if (record) {
          return(
            <Space size="small">
              <form onSubmit={(e) => handleUpdate(e)}>
                <Button type='primary'>Edit</Button>
              </form>
              <form onSubmit={(e) => handleDelete(e, record.id)}>
                <Button type='danger'>Delete</Button>
              </form>
            </Space>
          )
        }
      }
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={normalizedData}
      pagination={{ position: ['bottomCenter'] }}
    />
  )
}