import React, { FC } from 'react'
import { QuestionCheckboxPropsType } from './interface'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { OptionType } from '../QuestionCheckbox'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], onChange, disabled } = props
  const [form] = Form.useForm()

  function handleValuesChange() {
    //Invoke onChange
    if (onChange == null) return

    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType

    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null))
    }

    const { list = [] } = newValues
    list.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5)
    })

    onChange(newValues)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Options">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* Iterate each option */}
              {fields.map(({ key, name }, index) => {
                console.log(fields)
                return (
                  <Space key={key} align="baseline">
                    {/* Current option whether selected of unselected*/}
                    {/* 由于Checkbox没有value属性 因此使用valuePropName代替 */}
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>

                    {/* Current option input box */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: 'Please enter option words' },

                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue() //以下text为当前text值
                            let num = 0
                            list.forEach((opt: OptionType) => {
                              if (opt.text === text) num++ //Record the number of same text, expected only one
                            })

                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('Same as other options'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="Please enter option words..." />
                    </Form.Item>

                    {/* Current option deletion box */}
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}

              {/* Add Option */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Centered Display</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
