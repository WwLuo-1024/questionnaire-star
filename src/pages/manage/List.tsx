import React, { FC, useState } from 'react'
import styles from './List.module.scss'
import { QuestionCard } from '../../components/QuestionCard'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'

{
  /* Temporary Mock Data */
}
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
    isStar: false,
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
  {
    _id: 'q4',
    title: 'Question4',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '03/04 23:36',
  },
]

export const List: FC = () => {
  useTitle('Online Questionnaire - My Questionnaire')
  const [searchParams] = useSearchParams()

  console.log('keyword', searchParams.get('keyword'))
  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <h1>List</h1>
      <div className={styles['header']}>
        <div className={styles['left']}>
          <h3>My Questionnaire</h3>
        </div>
        <div className={styles['right']}>Search</div>
      </div>
      <div className={styles['content']}>
        {questionList.map(q => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles['footer']}>List Page Footer</div>
    </>
  )
}
