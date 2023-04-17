import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import { Spin } from 'antd'
import useNavPage from '../hooks/useNavPage'

export const QuestionLayout: FC = () => {
  //Load user data
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <div style={{ height: '100vh' }}>
      {waitingUserData ? (
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
