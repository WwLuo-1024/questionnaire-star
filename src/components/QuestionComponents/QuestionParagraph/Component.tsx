import React, { FC } from 'react'
import { QuestionParagraphPropsType, QuestionParagraphDefaultType } from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultType, ...props }

  //Do not use dangerouslySetInnerHTML!
  const textListr = text.split('\n') //example: ['hello', '123', '456']

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {textListr.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default Component
