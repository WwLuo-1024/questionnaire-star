import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import 'antd/dist/reset.css'
import { Button } from 'antd'

export const Home: FC = () => {
  const nav = useNavigate()
  function clickHandler() {
    nav('/login')
  }

  return (
    <>
      <p>Home</p>
      <div>
        <Button onClick={clickHandler}>Login</Button>
        <Link to="/register">Register</Link>
      </div>
    </>
  )
}
