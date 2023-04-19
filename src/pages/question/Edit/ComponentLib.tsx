import React, { FC } from 'react'
import { componentConfGroup } from '../../../components/QuestionComponents'
import { Typography } from 'antd'

const { Title } = Typography

const ComponentLib: FC = () => {
  return (
    <div>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLib
