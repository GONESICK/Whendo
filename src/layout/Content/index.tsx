import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
const { Content } = Layout

export default function index() {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer
      }}
    >
      <Outlet />
    </Content>
  )
}
