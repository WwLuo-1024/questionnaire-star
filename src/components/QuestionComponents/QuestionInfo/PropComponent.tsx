import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType } from './interface'
import { Form, Input } from 'antd'

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()
  const { TextArea } = Input

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  console.log(title)

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={handleValueChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the questionnaire title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
