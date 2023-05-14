import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { Spin, Result, Button } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'

export const Statistic: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()
  const nav = useNavigate()

  //Modify Title
  useTitle(`Questionnaire Statistic - ${title}`)

  //Loading effect
  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: 60 }}>
      <Spin size="large" />
    </div>
  )

  //Content Elem
  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="Not Published Yet"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                Back
              </Button>
            }
          ></Result>
        </div>
      )
    }

    return (
      <>
        <div className={styles.left}>LEFT</div>
        <div className={styles.main}>MAIN</div>
        <div className={styles.right}>RIGHT</div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div>Header</div>
      <div className={styles['content-wrapper']}>
        {loading && LoadingElem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  )
}
