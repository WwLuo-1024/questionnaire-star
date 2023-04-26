import React, { FC } from 'react'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'
import { Radio, Space, Typography } from 'antd'

const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props }
  const { Paragraph } = Typography
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(opt => {
            const { value, text } = opt
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
