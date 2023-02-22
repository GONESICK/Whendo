import { Layout, Menu, type MenuProps } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { type FC, useState, useEffect } from 'react'
import { useNavigate, useMatches } from 'react-router-dom'
import { getMenuList } from '@/api/user'

const { Sider } = Layout

const SiderComponent: FC<{ collapsed: boolean }> = ({
  collapsed
}: {
  collapsed: boolean
}) => {
  const navigate = useNavigate()
  const matches = useMatches()
  const [items, setItems] = useState([])
  const selectKeys = [matches[matches.length - 1].pathname]
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const handleCLick: MenuProps['onClick'] = ({ key, keyPath }) => {
    navigate(key)
  }
  // 生成item项
  const generateMenu = (data: any) => {
    const sortItems = data
      .sort((a: any, b: any) => a.sort - b.sort)
      .filter((f: any) => f.hidden)
    const items = sortItems.map((m: any) => {
      return {
        key: m.path,
        icon: <UserOutlined />,
        label: m.title,
        children: m.children ? generateMenu(m.children) : ''
      }
    })
    return items
  }
  // 加载菜单
  useEffect(() => {
    getMenuList({}).then(({ data: { list } }) => {
      const items = generateMenu(list)
      console.log(items)
      setItems(items)
    })
  }, [])
  // 菜单动态展开 高亮选中
  useEffect(() => {
    const parentRoute = matches.slice(0, -1)
    parentRoute.forEach((f) => {
      const idx = openKeys.findIndex((key) => key === f.pathname)
      if (idx < 0) {
        setOpenKeys([...openKeys, f.pathname])
      }
    })
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
