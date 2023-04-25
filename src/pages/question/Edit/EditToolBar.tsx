import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent } from '../../../store/ComponentsReducer'
import { changeComponentHidden } from '../../../store/ComponentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { toggleComponentLocked } from '../../../store/ComponentsReducer'
import { copySelectedComponent } from '../../../store/ComponentsReducer'
import { pasteCopiedComponent } from '../../../store/ComponentsReducer'

const EditToolBar: FC = () => {
  const dispatch = useDispatch()

  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  //Delete Component
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  //Hidden Component
  function handleHiddren() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  //Lock Component
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }

  //Copy Component
  function copy() {
    dispatch(copySelectedComponent())
  }

  //Paste Component
  function paste() {
    dispatch(pasteCopiedComponent())
  }

  return (
    <Space>
      {/* Deletion */}
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>

      {/* Hidden */}
      <Tooltip title="Hidden">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHiddren}></Button>
      </Tooltip>

      {/* Lock */}
      <Tooltip title="Lock">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>

      {/* Copy */}
      <Tooltip title="Copy">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>

      {/* Paste */}
      <Tooltip title="Paste">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent === null}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolBar
