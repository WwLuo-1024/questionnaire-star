import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import { resetPageInfo } from '../../../store/pageInfoReducer'
import { useDispatch } from 'react-redux'

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  // const { title, desc, js, css } = pageInfo
  const [form] = Form.useForm()
  const { TextArea } = Input
  const dispatch = useDispatch()

  //Real Time modify form content
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    // console.log('newValue', form.getFieldsValue())
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      {/* Title */}
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the title' }]}
      >
        <Input placeholder="Please enter the title" />
      </Form.Item>

      {/* Desc */}
      <Form.Item label="Questionnaire Description" name="desc">
        <TextArea placeholder="Questionnaire Description" />
      </Form.Item>

      {/* css */}
      <Form.Item label="Style Code" name="css">
        <TextArea placeholder="Enter style code..."></TextArea>
      </Form.Item>

      {/* js */}
      <Form.Item label="Script Code" name="js">
        <TextArea placeholder="Enter script code... "></TextArea>
      </Form.Item>
    </Form>
  )
}

export default PageSetting
