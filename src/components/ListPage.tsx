import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const { pathname } = useLocation()

  //Find page and pageSize from url parameters, and synchronised to the Pagination component
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || '' || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])

  // Redirect page when page and pageSize changed(change url params)
  function handlePageChange(page: number, pageSize: number) {
    // console.log('changed', page, pageSize) //change url params
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    // console.log(searchParams.toString())
    nav({
      pathname,
      search: searchParams.toString(), //Other than changing the page and pageSize, other url parameters are to be carried. For example, you can't have a pagination that doesn't exist when searching
    })
  }

  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />
  )
}

export default ListPage
