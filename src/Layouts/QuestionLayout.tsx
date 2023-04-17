import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import { Spin } from 'antd'
import useNavPage from '../hooks/useNavPage'

export const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <>
      <p>Question Layout</p>
      <div>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  )
}
