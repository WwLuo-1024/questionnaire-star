import React, { FC, useState } from 'react'
import styles from './List.module.scss'
import { QuestionCard } from '../components/QuestionCard'

const rawQuestionList = [
  {
    id: 'q1',
    title: 'Question1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '06/04 23:36',
  },
  {
    id: 'q2',
    title: 'Question2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '05/04 23:36',
  },
  {
    id: 'q3',
    title: 'Question3',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '04/04 23:36',
  },
  {
    id: 'q4',
    title: 'Question4',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '03/04 23:36',
  },
]

export const List: FC = () => {
  {
    /* Temporary Mock Data */
  }
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
      <div>List</div>
      <div>Footer</div>
    </>
  )
}
