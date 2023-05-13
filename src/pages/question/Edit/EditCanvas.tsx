import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
// import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
// import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/ComponentsReducer'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  // console.log(componentInfo)
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf
  // console.log(props)
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  //   console.log(componentList)
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation() //Prevent propagation
    dispatch(changeSelectedId(id))
  }

  //Bind keyPress
  useBindCanvasKeyPress()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin size="large" />
      </div>
    )
  }

  //items property of SortableContainer should ensure each item has its own id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  //Drag End
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c

            //convat class name
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            })

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
        {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>

      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
