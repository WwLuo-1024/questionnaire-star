import { Checkbox, Form, Input, Select } from 'antd'
import React, { FC, useEffect } from 'react'
import { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter, onChange } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    })
  }, [text, level, isCenter])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{ text, level, isCenter }}
    >
      <Form.Item
        label="Title Content"
        name="text"
        rules={[{ required: true, message: 'Please enter title content' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="layer" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        ></Select>
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>Centered Display</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
