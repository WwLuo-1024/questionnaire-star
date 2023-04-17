import React, { FC, useState, useEffect } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
const { Title } = Typography

export const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to="./">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>Online Questionnaire</Title>
        </Space>
      </Link>
    </div>
  )
}
