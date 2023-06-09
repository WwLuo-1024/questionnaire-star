import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '../router'
import { getUserInfoService } from '../services/user'
// import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
// import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

export const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}
  const { username, nickname } = useGetUserInfo()

  const dispatch = useDispatch()
  const nav = useNavigate()

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        Log Out
      </Button>
    </>
  )

  const Login = <Link to={REGISTER_PATHNAME}>Login/Register</Link>

  function logout() {
    dispatch(logoutReducer()) //clear redux user data
    removeToken() // Clear the storage of token
    message.success('Successfully Log Out')
    nav(LOGIN_PATHNAME)
  }
  return <div>{username ? UserInfo : Login}</div>
}
