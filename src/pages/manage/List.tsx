import React, { FC, useEffect, useState } from 'react'
import styles from './common.module.scss'
import { QuestionCard } from '../../components/QuestionCard'
import { useSearchParams } from 'react-router-dom'
import { useTitle, useRequest } from 'ahooks'
import { Typography, Spin } from 'antd'
import { ListSearch } from '../../components/ListSearch'
import { getQuestionListService } from '../../services/question'

{
  /* Temporary Mock Data */
}
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
//     isStar: false,
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
//   {
//     _id: 'q4',
//     title: 'Question4',
//     isPublished: true,
//     isStar: false,
//     answerCount: 5,
//     createAt: '03/04 23:36',
//   },
// ]

const { Title } = Typography
export const List: FC = () => {
  useTitle('Online Questionnaire - My Questionnaire')
  const [searchParams] = useSearchParams()

  console.log('keyword', searchParams.get('keyword'))
  // const [questionList, setQuestionList] = useState(rawQuestionList)

  // const [list, setList] = useState([])
  // const [total, setTotal] = useState(0)
  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService()
  //     const { list = [], total = 0 } = data
  //     setList(list)
  //     setTotal(total)
  //   }
  //   load()
  // }, [])

  const { data = {}, loading } = useRequest(getQuestionListService)
  const { list = [], total = 0 } = data
  return (
    <>
      <div className={styles['header']}>
        <div className={styles['left']}>
          <Title level={3}>My Questionnaire</Title>
        </div>
        <div className={styles['right']}>
          <ListSearch />
        </div>
      </div>
      <div className={styles['content']}>
        {/*Loading */}
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {/* Question List */}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles['footer']}>Load More...</div>
    </>
  )
}
