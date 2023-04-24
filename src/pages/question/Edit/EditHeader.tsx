import React, { FC } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const EditHeader: FC = () => {
  const nav = useNavigate()
  const { Title } = Typography

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              Back
            </Button>

            <Title>Questionnaire Title</Title>
          </Space>
        </div>
        <div className={styles.main}>Main</div>
        <div className={styles.right}>
          <Space>
            <Button>Save</Button>
            <Button type="primary">Post</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
