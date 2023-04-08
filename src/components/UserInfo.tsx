import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'

export const UserInfo: FC = () => {
  return (
    <div>
      <Link to={LOGIN_PATHNAME}>Login/My Account</Link>
    </div>
  )
}
