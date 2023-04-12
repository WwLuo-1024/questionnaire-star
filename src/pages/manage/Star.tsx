import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { QuestionCard } from '../../components/QuestionCard'
import { useRequest, useTitle } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'
import { ListSearch } from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
// const rawQuestionList = [
//   {
//     _id: 'q1', //mongoDB DataBase
//     title: 'Question1',
//     isPublished: false,
//     isStar: true,
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
//     isStar: true,
//     answerCount: 5,
//     createAt: '04/04 23:36',
//   },
// ]

export const Star: FC = () => {
  useTitle('Online Questionnaire - Star Questionnaire')
  // const [questionList, setQuestionList] = useState(rawQuestionList)
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data

  const { Title } = Typography
  return (
    <>
      <div className={styles['header']}>
        <div className={styles['left']}>
          <Title level={3}>Starred Questionnaire</Title>
        </div>
        <div className={styles['right']}>
          <ListSearch />
        </div>
      </div>

      {/*Loaind */}
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      <div className={styles['content']}>
        {/* Question List */}
        {!loading && list.length === 0 && <Empty description="No Data Available" />}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>

      <div className={styles['footer']}>Paging</div>
    </>
  )
}
