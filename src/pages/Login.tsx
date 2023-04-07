import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login: FC = () => {
  const nav = useNavigate()

  return (
    <>
      <h1>Login Page</h1>
      <div>
        <button onClick={() => nav(-1)}>Back</button>
      </div>
    </>
  )
}
