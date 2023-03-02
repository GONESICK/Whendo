import Layout from '@/layout/index'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/redux/hook'
import { type FC } from 'react'

const indexRouter: FC = () => {
  const accessToken = useAppSelector((state) => state.user.accessToken)
  if (accessToken !== '') {
    return <Layout />
  } else {
    return <Navigate to="/login" />
  }
}

export default indexRouter
