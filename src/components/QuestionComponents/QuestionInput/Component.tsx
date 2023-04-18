import React, { FC } from 'react'
import { QuestionInputPropsType, QuestionDefaultInputProps } from './interface'
import { Typography, Input } from 'antd'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionDefaultInputProps, ...props }
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default QuestionInput
