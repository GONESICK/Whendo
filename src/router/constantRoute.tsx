import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import IndexRouter from './IndexRouter'
import Login from '@/pages/Login/index'
import Home from '@/pages/Home'

export const routes: RouteObject[] = [
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
      }
    ]
  },
  {
    path: '/Login',
    element: <Login />
  }
  // {
  //   path: '*',
  //   element: <div>sorry,error</div>
  // }
]
