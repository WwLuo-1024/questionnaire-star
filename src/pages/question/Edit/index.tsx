import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/ComponentsReducer'
import LeftPanel from './LeftPanel'

export const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  function clearSelected() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '40px' }}>Header</div>

      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {/* Content Left */}
          <div className={styles.left}>
            <LeftPanel />
          </div>

          {/* Content Main */}
          <div className={styles.main} onClick={clearSelected}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>
                <EditCanvas loading={loading} />
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
