import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'

export const Register: FC = () => {
  const { Title } = Typography

  const onFinish = (values: any) => {
    console.log(values)
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
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Confirmation" name="confirm">
            <Input.Password />
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
