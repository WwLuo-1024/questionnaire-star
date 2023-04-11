import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '../router'

export const UserInfo: FC = () => {
  return (
    <div>
      <Link to={REGISTER_PATHNAME}>Login/Register</Link>
    </div>
  )
}
