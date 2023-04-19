import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          Component Library
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          Layer
        </span>
      ),
      children: <div>Layer</div>,
    },
  ]

  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
}

export default LeftPanel
