import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from './constantRoute'
import _ from 'lodash'

const modules = import.meta.glob('../pages/**/index.tsx')
const lazyLoad = (path: string) => {
  const Comp = lazy(modules[path] as any)
  return <Suspense fallback={<div>loading</div>}>{<Comp />}</Suspense>
}

export const conbimeRoutes = (menus: any) => {
  const croutes = deepMenu(menus)
  const newRoutes = _.cloneDeep(routes)
  if (newRoutes[0].children?.length === 2) {
    newRoutes[0].children = newRoutes[0].children?.concat(croutes)
  }
  return newRoutes
}

// 动态路由递归合并处理
export const deepMenu = (menus: any) => {
  const newMenus = menus.map((item: any, index: number) => {
    const route: Record<string, any> = { path: item.path?.replace('/', '') }
    if (item?.children && item.children.length) {
      const copyChild = JSON.parse(JSON.stringify(item.children))
      const deepChild = copyChild.map((m: any, i: number) => {
        const splitArr = m.path.split('/')
        return {
          ...m,
          path: splitArr[splitArr.length - 1]
        }
      })
      deepChild.unshift({
        index: true,
        element: React.createElement(Navigate, { to: deepChild[0].path })
      })
      route.children = deepMenu(deepChild)
    } else {
      if (item.index) {
        route.index = item.index
        route.element = item.element
        delete route.path
      } else {
        route.element = lazyLoad(`../pages${String(item.relativePath)}.tsx`)

        route.handle = { title: item.title }
      }
    }
    return route
  })
  return newMenus
}
