import React, { useEffect, type FC } from 'react'
import { useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { useMatches, useNavigate } from 'react-router-dom'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

type tabItems = Exclude<TabsProps['items'], undefined>

const Tab: FC = () => {
  const matches = useMatches()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('')
  const [items, setItems] = useState<tabItems>([
    {
      key: '/home',
      label: '首页',
      closable: false
    }
  ])

  useEffect(() => {
    const currentMatch = matches[matches.length - 1]
    const currentPath = currentMatch.pathname
    if (
      currentPath !== '/home' &&
      items.every((e) => e.key !== currentMatch.pathname)
    ) {
      setItems([
        ...items,
        {
          key: currentMatch.pathname,
          label: (currentMatch.handle as any)?.title
        }
      ])
    }
    setActiveKey(currentMatch.pathname)
  }, [matches])

  const onChange = (key: string) => {
    setActiveKey(key)
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
