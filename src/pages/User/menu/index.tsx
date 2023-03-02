import React, { useEffect, useState } from 'react'
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Radio,
  message,
  Popconfirm
} from 'antd'

import { getMenuList, getRoleList, setMenu, deleteMenu } from '@/api/user'
const { Option } = Select
const Menu = () => {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<any[]>([])
  const [roleList, setRoleList] = useState([])
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [subLoading, setSubLoading] = useState(false)
  const [currentId, setCurrentId] = useState('')
  const [columns, setColums] = useState<any[]>([
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              showDrawer('edit', record)
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="删除菜单"
            description="确认删除该菜单吗？"
            onConfirm={() => {
              confirm(record.id)
            }}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      )
    },
    {
      title: '所属角色',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: '菜单名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '父级菜单id',
      dataIndex: 'parent_id',
      key: 'parent_id'
    },
    {
      title: '路由路径',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort'
    },
    {
      title: '是否显示',
      dataIndex: 'hidden',
      key: 'hidden',
      render: (hidden: 0 | 1) => <span>{hidden ? '显示' : '隐藏'}</span>
    },
    {
      title: '组件类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: 0 | 1) => <span>{type ? '按钮' : '页面'}</span>
    }
  ])

  // 获取用户列表
  const getUserList = async () => {
    try {
      setLoading(true)
      const { data } = await getMenuList([])
      setLoading(false)
      setList(data.list)
    } catch (error) {}
  }
  // 获取角色列表
  const getRole = async () => {
    try {
      const { data } = await getRoleList()
      setRoleList(data.list)
    } catch (error) {}
  }

  // 确认删除
  const confirm = async (id: number) => {
    try {
      const { data } = await deleteMenu({ id })
      message.success(data)
    } catch (error) {
      message.error('error')
    }
  }

  const showDrawer = (type?: string, row?: any) => {
    if (type) {
      setCurrentId(row.id)
      form.setFieldsValue(row)
    }
    setOpen(true)
  }
  const onClose = () => {
    form.resetFields()

    setOpen(false)
  }
  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setSubLoading(true)
        setMenu({ ...values, id: currentId }).then((res) => {
          message.success('保存成功')
          setSubLoading(false)
        })
        setOpen(false)
      })
      .catch((err) => {
        message.error(err)
        setSubLoading(false)
      })
  }
  useEffect(() => {
    getUserList()
    getRole()
  }, [])
  return (
    <div>
      <div style={{ float: 'right', marginBottom: '10px' }}>
        <Button
          type="primary"
          onClick={() => {
            showDrawer()
          }}
        >
          添加菜单
        </Button>
      </div>
      <Table
        dataSource={list}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
        size="small"
      />
      {/* drawer */}
      <Drawer
        title="创建菜单"
        width={400}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} loading={subLoading} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          form={form}
          hideRequiredMark
          initialValues={{ hidden: 1, type: 0 }}
        >
          <Form.Item name="parent_id" label="父级菜单">
            <Select placeholder="请选择父级菜单">
              {list.map((option: any) => {
                return (
                  <Option value={option.id} key={option.id}>
                    {option.title}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="所属角色"
            rules={[{ required: true, message: '请选择所属角色' }]}
          >
            <Select placeholder="请选择所属角色" mode="multiple">
              {roleList.map((option: any) => {
                return (
                  <Option value={option.name} key={option.id}>
                    {option.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="path"
            label="路由路径"
            rules={[{ required: true, message: '请输入路由路径' }]}
          >
            <Input style={{ width: '100%' }} placeholder="请输入路由路径" />
          </Form.Item>
          <Form.Item
            name="title"
            label="菜单名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input style={{ width: '100%' }} placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item
            name="relativePath"
            label="组件路径"
            rules={[{ required: true, message: '请输入组件路径' }]}
          >
            <Input style={{ width: '100%' }} placeholder="请输入组件路径" />
          </Form.Item>
          <Form.Item name="sort" label="排序">
            <Input style={{ width: '100%' }} placeholder="请输入顺序" />
          </Form.Item>
          <Form.Item name="icon" label="菜单图标">
            <Input style={{ width: '100%' }} placeholder="请输入图标名称" />
          </Form.Item>
          <Form.Item
            name="hidden"
            label="是否隐藏"
            rules={[{ required: true, message: '请选择是否隐藏菜单' }]}
          >
            <Radio.Group>
              <Radio value={1}>显示</Radio>
              <Radio value={0}>隐藏</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="type"
            label="组件类型"
            rules={[
              {
                required: true,
                message: '请选择组件类型'
              }
            ]}
          >
            <Radio.Group>
              <Radio value={0}>页面</Radio>
              <Radio value={1}>按钮</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default Menu
