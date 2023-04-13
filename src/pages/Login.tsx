import React, { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { HOME_PATHNAME, REGISTER_PATHNAME } from '../router'
import { loginService } from '../services/user'
import { useRequest } from 'ahooks'

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

export const Login: FC = () => {
  // const nav = useNavigate()
  const { Title } = Typography
  const [form] = Form.useForm() //Form hook
  const nav = useNavigate()

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  //Login Request
  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess() {
        message.success('Successfully Login')
        nav(HOME_PATHNAME)
      },
    }
  )
  const onFinish = (values: any) => {
    console.log(values)
    const { username, password, remember } = values || {}
    run(username, password) // Execute Ajax

    if (remember) {
      rememberUser(username, password)
    } else {
      deleteFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>Login</Title>
        </Space>
      </div>

      <div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please enter the username' },
              { type: 'string', min: 5, max: 20, message: 'The length of username between 5-20' },
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

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Link to={REGISTER_PATHNAME}>Register new user</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
