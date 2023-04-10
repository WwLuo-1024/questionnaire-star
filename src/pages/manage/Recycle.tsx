import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { QuestionCard } from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message } from 'antd'
import Column from 'antd/es/table/Column'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const rawQuestionList = [
  {
    _id: 'q1', //mongoDB DataBase
    title: 'Question1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '06/04 23:36',
  },
  {
    _id: 'q2',
    title: 'Question2',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '05/04 23:36',
  },
  {
    _id: 'q3',
    title: 'Question3',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '04/04 23:36',
  },
]

export const Recycle: FC = () => {
  const { Title } = Typography

  const [questionList, setQuestionList] = useState(rawQuestionList)
  const tableColumns = [
    {
      title: 'Ttile',
      dataIndex: 'title',
      // key:'title,'
    },
    {
      title: 'Is Published',
      dataIndex: 'isPublsihed',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">Published</Tag> : <Tag>Not Publish</Tag>
      },
    },
    {
      title: 'Number of Answer',
      dataIndex: 'answerCount',
    },
    {
      title: 'Created Time',
      dataIndex: 'createAt',
    },
  ]
  //Recording the selected ID
  const [seletedIds, setSelectedIds] = useState<string[]>([])

  const { confirm } = Modal

  //Delete question function
  function del() {
    confirm({
      title: 'Confirming the deletion of the questionnaire?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cannot be retrieved after deletion',
      onOk: () => message.success(`Delete ${JSON.stringify(seletedIds)}`),
    })
  }
  //We can define a JSX fragment as a variable
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={seletedIds.length === 0}>
            Recovery
          </Button>
          <Button danger disabled={seletedIds.length === 0} onClick={del}>
            Delete
          </Button>
        </Space>
      </div>

      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id} //Tell table which property was used to be key
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles['header']}>
        <div className={styles['left']}>
          <Title level={3}>Recycle Bin</Title>
        </div>
        <div className={styles['right']}>Search</div>
      </div>

      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="No Data Available" />}
        {questionList.length > 0 && TableElem}
      </div>
    </>
  )
}
