import http from '@/http'

// 获取用户列表
export const getUserList = (data: any) => {
  return http({
    url: '/userList',
    method: 'post',
    data
  })
}

// 获取菜单列表
export const getMenuList = (data: any) => {
  return http({
    url: '/menuList',
    method: 'post',
    data
  })
}

// 获取角色列表
export const getRoleList = () => {
  return http({
    url: '/roleList',
    method: 'get'
  })
}

// 获取角色列表
export const setMenu = (data: any) => {
  return http({
    url: '/setMenu',
    method: 'post',
    data
  })
}
