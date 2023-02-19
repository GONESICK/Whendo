import { useState } from 'react'
import { Layout } from 'antd'
import Header from './Header/index'
import Sider from './Sider/index'
import Content from './Content/index'
import Tab from './Tab/index'

export default function index() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed}></Header>
        <Tab />
        <Content />
      </Layout>
    </Layout>
  )
}
