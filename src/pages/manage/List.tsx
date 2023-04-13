import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import styles from './common.module.scss'
import { QuestionCard } from '../../components/QuestionCard'
// import { useSearchParams } from 'react-router-dom'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import { ListSearch } from '../../components/ListSearch'
// import { getQuestionListService } from '../../services/question'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
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
  const [started, setStarted] = useState(false) //Mark if loading has started

  //The page will reset all data when keyword is changed
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  //active loading
  const containerRef = useRef<HTMLDivElement>(null)

  //Real Loading
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  //Try load more
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      // console.log(containerRef)
      if (elem === null) return

      const domReact = elem.getBoundingClientRect()
      if (domReact === null) return
      const { bottom } = domReact
      //document.body.clientHeight - Viewport size 视口大小
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
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
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore) //Anti-shake 防抖
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore) //!!! Unbind events when searchParams change
    }
  }, [searchParams, haveMoreData])

  //Load More
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="No data" />
    if (!haveMoreData) return <span>No More Data...</span>
    return <span>Start to load next page</span>
  }, [started, loading, haveMoreData])

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
        {/* Question List */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles['footer']}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}
