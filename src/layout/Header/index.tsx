import React, { type FC } from 'react'
import { useAppDispatch } from '@/redux/hook'
import { setToken, setUserInfo, setMenus } from '@/redux/slice/userSlice'
import { Layout, theme, Avatar, Space, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  UserOutlined
} from '@ant-design/icons'

const { Header } = Layout

interface propsType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '账号设置'
  },
  {
    key: '2',
    danger: true,
    label: '退出'
  }
]

const HeaderComponent: FC<propsType> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const dispatch = useAppDispatch()

  const menuClick: MenuProps['onClick'] = (event) => {
    const { key } = event
    switch (key) {
      case '1':
        break
      case '2':
        dispatch(setToken(''))
        dispatch(setUserInfo({}))
        dispatch(setMenus([]))
        break
    }
  }

  return (
    <Header style={{ padding: '0 16px', background: colorBgContainer }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => {
          setCollapsed(!collapsed)
        }
      })}
      <div style={{ float: 'right' }}>
        <Space>
          <Dropdown
            menu={{
              items,
              onClick: menuClick
            }}
          >
            <span
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Space>
                admin
                <DownOutlined />
              </Space>
            </span>
          </Dropdown>
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
        </Space>
      </div>
    </Header>
  )
}

export default HeaderComponent
