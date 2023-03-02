import React from 'react'
import { Layout, Menu, type MenuProps } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { type FC, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/redux/hook'
// import { getMenu } from '@/router/index'

// 图标字典
const Iocns: Record<string, any> = {
  UserOutlined
}

const { Sider } = Layout

const SiderComponent: FC<{ collapsed: boolean }> = ({
  collapsed
}: {
  collapsed: boolean
}) => {
  const menus = useAppSelector((state) => state.user.menus)
  const navigate = useNavigate()
  const matches = useLocation()

  const [items, setItems] = useState([
    {
      key: '/home',
      icon: <UserOutlined />,
      label: '首页'
    }
  ])
  const selectKeys = [matches.pathname]
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const handleCLick: MenuProps['onClick'] = ({ key, keyPath }) => {
    navigate(key)
  }
  // 生成item项
  const generateMenu = (data: any) => {
    const copyItems = JSON.parse(JSON.stringify(data))
    copyItems.sort((a: any, b: any) => a.sort - b.sort)
    const sortItems = copyItems.filter((f: any) => f.hidden)
    const items = sortItems.map((m: any) => {
      return {
        key: m.path,
        icon: React.createElement(Iocns[m.icon]),
        label: m.title,
        children: m.children ? generateMenu(m.children) : ''
      }
    })
    return items
  }
  const loadMenus = () => {
    const item = generateMenu(menus)
    const newItems = item.filter((f: any) => {
      return items.every((e: any) => e.key !== f.key)
    })
    setItems(items.concat(newItems))
  }
  // 加载菜单
  useEffect(() => {
    if (menus?.length) {
      loadMenus()
    }
  }, [menus])

  // 菜单动态展开 高亮选中
  useEffect(() => {
    const currentParent = '/' + matches.pathname.split('/')[1]
    const parentRoute = currentParent

    const idx = openKeys.findIndex((key) => key === parentRoute)
    if (idx < 0) {
      setOpenKeys([...openKeys, parentRoute])
    }
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
