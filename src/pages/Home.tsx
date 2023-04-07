import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export const Home: FC = () => {
  const nav = useNavigate()
  function clickHandler() {
    nav('/login')
  }

  return (
    <>
      <p>Home</p>
      <div>
        <button onClick={clickHandler}>Login</button>
        <Link to="/register">Register</Link>
      </div>
    </>
  )
}
