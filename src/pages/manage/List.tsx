import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './common.module.scss'
import { QuestionCard } from '../../components/QuestionCard'
// import { useSearchParams } from 'react-router-dom'
import { useTitle, useDebounceFn } from 'ahooks'
import { Typography, Spin } from 'antd'
import { ListSearch } from '../../components/ListSearch'
// import { getQuestionListService } from '../../services/question'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { useSearchParams } from 'react-router-dom'
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

  // const [searchParams] = useSearchParams()
  // console.log('keyword', searchParams.get('keyword'))

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

  // const { data = {}, loading } = useRequest(getQuestionListService)

  // const { data = {}, loading } = useLoadQuestionListData()
  // const { list = [], total = 0 } = data

  const [page, setPage] = useState(1) //Internal data in List, it would not be shown in url
  const [list, setList] = useState([]) //Total accumulated data
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length //Are there any more unloaded data
  const [searchParams] = useSearchParams() //url params, altough no page and pageSize, keyword

  //active loading
  const containerRef = useRef<HTMLDivElement>(null)
  //Real Loading

  //Try load more
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem === null) return

      const domReact = elem.getBoundingClientRect()
      if (domReact === null) return
      const { bottom } = domReact
      //document.body.clientHeight - Viewport size 视口大小
      if (bottom <= document.body.clientHeight) {
        console.log(bottom)
        console.log(document.body.clientHeight)
        console.log('Execute')
      }
    },
    {
      wait: 1000,
    }
  )

  //Triggers loading when the page loads, or when the url parameter (keyword) changes
  useEffect(() => {
    tryLoadMore() // 1. Load frist page(initialization)
  }, [searchParams])

  //2. Attempt to trigger loading when the page is scrolled
  useEffect(() => {
    // if (haveMoreData) {
    window.addEventListener('scroll', tryLoadMore) //Anti-shake 防抖
    // }

    return () => {
      window.removeEventListener('scroll', tryLoadMore) //!!! Unbind events when searchParams change
    }
  }, [searchParams])

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
        {/* {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )} */}
        {/* Question List */}
        {/* {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })} */}
        <div style={{ height: '2000px' }}></div>
        {list.map((q: any) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles['footer']}>
        <div ref={containerRef}>LoadMore...</div>
      </div>
    </>
  )
}
