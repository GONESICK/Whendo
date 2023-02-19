import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import IndexRouter from './IndexRouter'
import Login from '@/pages/Login/index'
import Home from '@/pages/Home'
import Role from '@/pages/User/role'
import List from '@/pages/User/list'
import MessageList from '@/pages/message/list'
import Notification from '@/pages/message/notification'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <IndexRouter />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />
      },
      {
        path: 'home',
        element: <Home />,
        handle: {
          title: '首页'
        }
      },
      {
        path: 'user',
        children: [
          { index: true, element: <Navigate to="list" /> },
          {
            path: 'list',
            element: <List />,
            handle: {
              title: '用户列表'
            }
          },
          {
            path: 'role',
            element: <Role />,
            handle: {
              title: '角色列表'
            }
          }
        ],
        handle: {
          title: '用户管理'
        }
      },
      {
        path: 'message',
        children: [
          {
            index: true,
            element: <Navigate to="list" />
          },
          {
            path: 'list',
            element: <MessageList />,
            handle: {
              title: '公告列表'
            }
          },
          {
            path: 'notification',
            element: <Notification />,
            handle: {
              title: '消息通知'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '*',
    element: <div>sorry,something wrong</div>
  }
]

const router = createBrowserRouter(routes, { basename: '/admin' })

export default router
