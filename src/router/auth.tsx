import { useEffect, useState, type FC } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { useRoutes } from 'react-router-dom'
import { getMenus, getInfo } from '@/redux/slice/userSlice'
import { conbimeRoutes } from './index'
const AuthRoute: FC = () => {
  const accessToken = useAppSelector((state) => state.user.accessToken)
  const menus = useAppSelector((state) => state.user.menus)
  const ori = conbimeRoutes(menus)
  const [ruts, setRuts] = useState<any[]>(ori)
  const dispatch = useAppDispatch()
  // 每次重新渲染/刷新时重新请求一次角色信息跟路由
  useEffect(() => {
    if (accessToken) {
      dispatch(getInfo()).then((res) => {
        dispatch(getMenus())
      })
    }
  }, [])
  // 订阅menus状态，每次更新之后更新一次路由配置
  useEffect(() => {
    setRuts(ori)
  }, [menus])
  const element = useRoutes(ruts)
  return element
}

export default AuthRoute
