import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'

export const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '40px' }}>Header</div>

      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {/* Content Left */}
          <div className={styles.left}>Left</div>

          {/* Content Main */}
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>
                <EditCanvas />
              </div>
            </div>
          </div>
          {/* Content Right */}
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  )
}
