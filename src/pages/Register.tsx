import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { registerService } from '../services/user'
import { useRequest } from 'ahooks'
// import Password from 'antd/es/input/Password'

export const Register: FC = () => {
  const { Title } = Typography
  const nav = useNavigate()
  const { run } = useRequest(
    async values => {
      //"values" stored the user typed value
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('Successfully Register')
        nav(LOGIN_PATHNAME)
      },
    }
  )
  const onFinish = (values: any) => {
    // console.log(values) "values" stored the user typed value
    run(values)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>Register As A New User</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please enter the username' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: 'The length of username should between 5-20',
              },
              { pattern: /^\w+$/, message: 'Only letter, number and underline are accepted' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter the password' }]}
          >
            <Input.Password />
          </Form.Item>

          {/* Confirmation */}
          <Form.Item
            label="Confirmation"
            name="confirm"
            dependencies={['password']} //Dependent on password， Password changes will reactivate validator for verification
            rules={[
              {
                required: true,
                message: 'Please enter the password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('Two inconsistent passwords'))
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Nickname */}
          <Form.Item
            label="Nickname"
            name="nickname"
            rules={[
              { required: false },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: 'The length of nickname should between 5-20',
              },
              { pattern: /^\w+$/, message: 'Only letter, number and underline are accepted' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <Link to={LOGIN_PATHNAME}>Already have an account, login</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
