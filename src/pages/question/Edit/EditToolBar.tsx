import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent } from '../../../store/ComponentsReducer'
import { changeComponentHidden } from '../../../store/ComponentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolBar: FC = () => {
  const dispatch = useDispatch()

  const { selectedId } = useGetComponentInfo()

  //Delete Component
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  //Hidden Component
  function handleHiddren() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
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
    </Space>
  )
}

export default EditToolBar
