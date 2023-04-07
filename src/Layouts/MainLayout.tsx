import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout: FC = () => {
  return (
    <>
      <div>MainLayout Header</div>
      <div>
        <Outlet />
      </div>
      <div>MainLayout Footer</div>
    </>
  )
}
