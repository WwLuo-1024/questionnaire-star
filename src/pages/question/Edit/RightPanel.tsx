import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponenProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

//TS Enum
enum TAB_KEYS {
  PROB_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activekey, setActiveKey] = useState(TAB_KEYS.PROB_KEY)
  const { selectedId } = useGetComponentInfo()

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROB_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])

  const tabsItem = [
    {
      key: TAB_KEYS.PROB_KEY,
      label: (
        <span>
          <FileTextOutlined />
          Property
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          Page Setting
        </span>
      ),
      children: <PageSetting />,
    },
  ]

  return <Tabs activeKey={activekey} items={tabsItem}></Tabs>
}

export default RightPanel
