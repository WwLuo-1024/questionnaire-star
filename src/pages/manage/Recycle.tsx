import React, { FC, useState } from 'react'
import styles from './common.module.scss'
// import { QuestionCard } from '../../components/QuestionCard'
import { useRequest } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message, Spin } from 'antd'
// import Column from 'antd/es/table/Column'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ListSearch } from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { updateQuestionService, deleteQuestionService } from '../../services/question'
// const rawQuestionList = [
//   {
//     _id: 'q1', //mongoDB DataBase
//     title: 'Question1',
//     isPublished: false,
//     isStar: false,
//     answerCount: 5,
//     createAt: '06/04 23:36',
//   },
//   {
//     _id: 'q2',
//     title: 'Question2',
//     isPublished: true,
//     isStar: true,
//     answerCount: 5,
//     createAt: '05/04 23:36',
//   },
//   {
//     _id: 'q3',
//     title: 'Question3',
//     isPublished: false,
//     isStar: false,
//     answerCount: 5,
//     createAt: '04/04 23:36',
//   },
// ]

export const Recycle: FC = () => {
  const { Title } = Typography

  // const [questionList, setQuestionList] = useState(rawQuestionList)
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total } = data
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

  //Recovery
  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      for await (const id of seletedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      // debounceWait: 500, //debounce防抖
      onSuccess() {
        message.success('Successfully Recovered')
        refresh() //Manually refresh
        setSelectedIds([])
      },
    }
  )

  //Delete question function
  const { run: deleteQuestion } = useRequest(async () => await deleteQuestionService(seletedIds), {
    manual: true,
    onSuccess() {
      message.success('Successfully Delete')
      refresh()
      setSelectedIds([])
    },
  })

  function del() {
    confirm({
      title: 'Confirming the deletion of the questionnaire?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cannot be retrieved after deletion',
      onOk: deleteQuestion,
    })
  }
  //We can define a JSX fragment as a variable
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button
            type="primary"
            disabled={seletedIds.length === 0 || recoverLoading}
            onClick={recover}
          >
            Recovery
          </Button>
          <Button danger disabled={seletedIds.length === 0} onClick={del}>
            Delete
          </Button>
        </Space>
      </div>

      <Table
        dataSource={list}
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
        <div className={styles['right']}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="No Data Available" />}
        {!loading && list.length > 0 && TableElem}
      </div>

      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}
