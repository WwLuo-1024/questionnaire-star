import React, { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Checkbox, Form, Input } from 'antd'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={disabled}
      onValuesChange={handleValueChange}
      form={form}
    >
      <Form.Item
        label="Paragraph Content"
        name="text"
        rules={[{ required: true, message: 'Please enter paragraph contents' }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>Centered Display</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
