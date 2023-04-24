import React, { FC } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponenProp'

const RightPanel: FC = () => {
  const tabsItem = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          Property
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          Page Setting
        </span>
      ),
      children: <div>Page Setting</div>,
    },
  ]

  return <Tabs defaultActiveKey="prop" items={tabsItem}></Tabs>
}

export default RightPanel
