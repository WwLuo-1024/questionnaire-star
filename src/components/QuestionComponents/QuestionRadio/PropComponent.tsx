import React, { FC, useEffect } from 'react'
import { QuestionRadioPropsType, OptionType } from './interface'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])

  function handleValuesChange() {
    if (onChange == null) return
    //Trigge onChange function
    const newValues = form.getFieldsValue() as QuestionRadioPropsType

    if (newValues.options) {
      //Need to clear the option with text undefined
      newValues.options = newValues.options.filter(opt => !(opt.text == null))
    }

    const { options = [] } = newValues
    options.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5) //Complete the opt value otherwise null value
    })

    onChange(newValues)
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Options">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* Iterate each option */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* Current option input box */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: 'Please enter option words' },

                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue() //以下text为当前text值
                            let num = 0
                            options.forEach((opt: OptionType) => {
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
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}

              {/* Add Option */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
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

      <Form.Item label="Default selected" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))} //option本身定义为数组 还需要解构
        ></Select>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Centered Display</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
