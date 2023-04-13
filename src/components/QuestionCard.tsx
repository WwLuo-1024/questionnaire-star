import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Divider, Space, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { duplicateQuestionService, updateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createAt: string
}

const { confirm } = Modal

export const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createAt, answerCount, isPublished, isStar } = props
  const nav = useNavigate()

  //Modify Star
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState) //Update Star State
        message.success('Successfully Updated')
      },
    }
  )

  // function duplicate() {
  //   message.success('Execute a copy')
  // }
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        message.success('Execute a copy')
        nav(`/question/edit/${res.id}`) //navigate to edit page
      },
    }
  )

  //Delete
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('Successfully Delete')
        setIsDeletedState(true)
      },
    }
  )

  function del() {
    confirm({
      title: 'Confirming the deletion of the questionnaire?',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  // Questionnaires that have been deleted and no longer render cards
  if (isDeletedState) return null

  return (
    <div className={styles['container']}>
      {/* <p>Question Card Page {_id}</p> */}

      {/* Top Part */}
      <div className={styles['title']}>
        <div className={styles['left']}>
          <Link to={isPublished ? `/question/statistic/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
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
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? 'Unstar' : 'Star'}
            </Button>
            <Popconfirm
              title="Confirming the duplication of the questionnaire?"
              okText="Confirm"
              cancelText="Cancel"
              onConfirm={duplicate}
              disabled={duplicateLoading}
            >
              <Button type="text" size="small" icon={<CopyOutlined />}>
                Copy
              </Button>
            </Popconfirm>

            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={del}
              disabled={deleteLoading}
            >
              Delete
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
