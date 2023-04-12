import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { createQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

export const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  //Set Loaindg to prevent multiple clicks
  // const [loading, setLoading] = useState(false)

  {
    /* Ajax */
  }
  // async function handleCreateClick() {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   const { id } = data || {}
  //   setLoading(false)
  //   if (id) {
  //     nav(`/question/edit/${id}`)
  //     message.success('Successfully Created')
  //   }
  // }

  const {
    loading,
    // error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
      message.success('Successfully Created')
    },
  })

  return (
    <div className={styles['container']}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            Create Qustionaaire
          </Button>
          {/* style={{ borderTop: 'transparent' }} Delete line style */}
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            My Questionnaire
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            Starred Questionnaire
          </Button>
          <Button
            type={pathname.startsWith('/manage/recycle') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/recycle')}
          >
            Recycle Bin
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
