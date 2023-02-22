import Layout from '@/layout/index'
import { Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { getInfo } from '@/redux/slice/userSlice'
import { useEffect, type FC } from 'react'

const indexRouter: FC = () => {
  const accessToken = useAppSelector((state) => state.user.accessToken)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (accessToken) {
      dispatch(getInfo())
    }
  }, [])

  if (accessToken !== '') {
    return <Layout />
  } else {
    return <Navigate to="/login" />
  }
}

export default indexRouter
