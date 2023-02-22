import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { getUserList } from '@/api/user'

const User = () => {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<any[]>([])
  const [columns, setColums] = useState<any[]>([
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'name'
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: '邮件地址',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar'
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at'
    }
  ])
  // 获取用户列表
  const getList = async () => {
    try {
      setLoading(true)
      const { data } = await getUserList([])
      setLoading(false)
      setList(data.list)
    } catch (error) {}
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <div>
      <Table
        dataSource={list}
        columns={columns}
        rowKey="uid"
        loading={loading}
        size="small"
      />
    </div>
  )
}

export default User
