import React, { useEffect, type FC } from 'react'
import { useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/redux/hook'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

type tabItems = Exclude<TabsProps['items'], undefined>

const Tab: FC = () => {
  const location = useLocation()
  const menus = useAppSelector((state) => state.user.menus)
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('')
  const [items, setItems] = useState<tabItems>([
    {
      key: '/home',
      label: '首页',
      closable: false
    }
  ])
  // 递归查找title
  const getLabel = (menu: any[], pathName: string) => {
    let label = ''
    menu.forEach((item: any) => {
      if (item.path === pathName) {
        label = item.title
      }
      if (!label && item.children) {
        label = getLabel(item.children, pathName)
      }
    })
    return label
  }
  useEffect(() => {
    const currentPath = location?.pathname
    if (currentPath !== '/home' && items.every((e) => e.key !== currentPath)) {
      setItems([
        ...items,
        {
          key: currentPath,
          label: getLabel(menus, currentPath)
        }
      ])
    }
    setActiveKey(currentPath)
  }, [location])

  const onChange = (key: string) => {
    setActiveKey(key)
    navigate(key)
  }
  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey)
    const newPanes = items.filter((pane) => pane.key !== targetKey)
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ]
      setActiveKey(key)
      navigate(key, { replace: true })
    }
    setItems(newPanes)
  }
  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey)
    }
  }
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Tabs
        hideAdd
        size="small"
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </div>
  )
}

export default Tab
