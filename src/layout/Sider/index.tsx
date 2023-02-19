import { Layout, Menu, type MenuProps } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { type FC, useState, useEffect } from 'react'
import { useNavigate, useMatches } from 'react-router-dom'

const { Sider } = Layout

const items: MenuProps['items'] = [
  {
    key: '/home',
    icon: <VideoCameraOutlined />,
    label: 'nav 1'
  },
  {
    key: '/user',
    icon: <UserOutlined />,
    label: '用户管理',
    children: [
      {
        key: '/user/list',
        icon: <UserOutlined />,
        label: '用户列表'
      },
      {
        key: '/user/role',
        icon: <UserOutlined />,
        label: '角色列表'
      }
    ]
  },
  {
    key: '/message',
    icon: <UserOutlined />,
    label: '公告管理',
    children: [
      {
        key: '/message/list',
        icon: <UserOutlined />,
        label: '公告列表'
      },
      {
        key: '/message/notification',
        icon: <UserOutlined />,
        label: '消息通知'
      }
    ]
  }
]

const SiderComponent: FC<{ collapsed: boolean }> = ({
  collapsed
}: {
  collapsed: boolean
}) => {
  const navigate = useNavigate()
  const matches = useMatches()
  const selectKeys = [matches[matches.length - 1].pathname]
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const handleCLick: MenuProps['onClick'] = ({ key, keyPath }) => {
    navigate(key)
  }
  useEffect(() => {
    const parentRoute = matches.slice(0, -1)
    parentRoute.forEach((f) => {
      const idx = openKeys.findIndex((key) => key === f.pathname)
      if (idx < 0) {
        setOpenKeys([...openKeys, f.pathname])
      }
    })
    // setOpenKeys(openKeys)
  }, [matches])
  const handleOpenChange = (openKey: string[]) => {
    if (openKey.length > 1) {
      openKey.shift()
    }
    setOpenKeys(openKey)
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleCLick}
        style={{ minHeight: '100vh' }}
        defaultSelectedKeys={['1']}
        items={items}
        selectedKeys={selectKeys}
        onOpenChange={handleOpenChange}
        openKeys={openKeys}
      />
    </Sider>
  )
}
SiderComponent.defaultProps = {
  collapsed: false
}
export default SiderComponent
