import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Divider, Space, Tag } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createAt: string
}

export const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createAt, answerCount, isPublished, isStar } = props
  const nav = useNavigate()
  return (
    <div className={styles['container']}>
      {/* <p>Question Card Page {_id}</p> */}

      {/* Top Part */}
      <div className={styles['title']}>
        <div className={styles['left']}>
          <Link to={isPublished ? `/question/statistic/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles['right']}>
          <Space>
            {isPublished ? <Tag color="processing">Published</Tag> : <Tag>Unpublished</Tag>}

            <span>Answer: {answerCount}</span>

            <span>{createAt}</span>
          </Space>
        </div>
      </div>

      <Divider style={{ margin: '12px' }} />

      {/* Bottom Part */}
      <div className={styles['button-container']}>
        <div className={styles['left']}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              Edit Questionnaire
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/statistic/${_id}`)}
              disabled={!isPublished}
            >
              Data Statistic
            </Button>
          </Space>
        </div>
        <div className={styles['right']}>
          <Space>
            <Button type="text" size="small" icon={<StarOutlined />}>
              {isStar ? 'Unstar' : 'Star'}
            </Button>
            <Button type="text" size="small" icon={<CopyOutlined />}>
              Copy
            </Button>
            <Button type="text" size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
