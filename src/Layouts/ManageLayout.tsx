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
        <button>My Questionnaire</button>
        <br />
        <button>Star Questionnaire</button>
        <br />
        <button>Recycle Bin</button>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
