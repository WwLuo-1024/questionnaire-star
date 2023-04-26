import React, { FC } from 'react'
import { QuestionParagraphPropsType, QuestionParagraphDefaultType } from './interface'
import { Typography } from 'antd'

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultType, ...props }
  const { Paragraph } = Typography
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {text}
    </Paragraph>
  )
}

export default Component
