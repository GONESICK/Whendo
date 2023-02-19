import http from '@/http'

// 用户登录
export const login = (data: any) => {
  return http({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return http({
    url: '/getUserInfo',
    method: 'get'
  })
}
