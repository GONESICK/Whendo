import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { getRoleList } from '@/api/user'

const User = () => {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<any[]>([])
  const [columns, setColums] = useState<any[]>([
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '角色类型',
      dataIndex: 'type',
      key: 'type'
    }
  ])
  // 获取用户列表
  const getList = async () => {
    try {
      setLoading(true)
      const { data } = await getRoleList()
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
        rowKey="id"
        loading={loading}
        size="small"
      />
    </div>
  )
}

export default User
