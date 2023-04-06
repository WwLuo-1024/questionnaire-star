import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createAt: string
}

export const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createAt, answerCount, isPublished } = props
  return (
    <div className={styles['container']}>
      {/* <p>Question Card Page {_id}</p> */}

      {/* Top Part */}
      <div className={styles['title']}>
        <div className={styles['left']}>
          <a href="#">{title}</a>
        </div>
        <div className={styles['right']}>
          {isPublished ? (
            <span style={{ color: 'green' }}>Published</span>
          ) : (
            <span>Unpublished</span>
          )}
          &nbsp;
          <span>Answer: {answerCount}</span>
          &nbsp;
          <span>{createAt}</span>
        </div>
      </div>

      {/* Bottom Part */}
      <div className={styles['button-container']}>
        <div className={styles['left']}>
          <button>Edit Questionnaire</button>
          <button>Data Statistic</button>
        </div>
        <div className={styles['right']}>
          <button>Star</button>
          <button>Copy</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  )
}
