import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

export const ManageLayout: FC = () => {
  return (
    <div className={styles['container']}>
      <div className={styles.left}>
        <p>ManageLayout</p>
        <button>Create Qustionaaire</button>
        <br />
        <a href="#">My Questionnaire</a>
        <br />
        <a href="#">Star Questionnaire</a>
        <br />
        <a href="#">Recycle Bin</a>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
