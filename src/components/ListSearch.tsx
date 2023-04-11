import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
//useSearchParams: To obtain parameters of url
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

export const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  // Obtaining url params, and set it to input value
  const [searchParams] = useSearchParams('')
  useEffect(() => {
    //Always execute this function when searchParams changed
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  function handleSearch(value: string) {
    console.log(value)
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  return (
    <>
      <Search
        allowClear
        placeholder="Input Key Words"
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: '260px' }}
      />
    </>
  )
}
