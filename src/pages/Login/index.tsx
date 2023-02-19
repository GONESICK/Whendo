import React, { type FC, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { userlogin } from '@/redux/slice/userSlice'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginStyleWrapper } from './style'

const Login: FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.accessToken)

  const handleLogin = async (params: any) => {
    try {
      await dispatch(userlogin(params))
      setLoading(false)
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }
  const onFinish = (values: any) => {
    setLoading(true)
    handleLogin(values)
  }
  return (
    <LoginStyleWrapper>
      <div className="loginbox">
        token:{token}
        <div className="head">
          <h2>Login</h2>
          <span>Whendo Admin</span>
        </div>
        <Form
          name="login"
          requiredMark
          onFinish={onFinish}
          autoComplete="off"
          scrollToFirstError
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Button block type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginStyleWrapper>
  )
}

export default Login
