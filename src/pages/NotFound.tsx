import React, { FC } from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_PATHNAME } from '../router'

export const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, The page you visited does not exist"
      extra={
        <Button type="primary" onClick={() => nav(HOME_PATHNAME)}>
          Back Home
        </Button>
      }
    ></Result>
  )
}
