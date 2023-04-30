import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space, Input, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolBar from './EditToolBar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { updateQuestionService } from '../../../services/question'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'

const { Title } = Typography

//Display and modify title
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const dispatch = useDispatch()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

//Save Button
const SaveButton: FC = () => {
  //id+ pageInfo + componentList
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true }
  ) //手动-需要点击按钮执行

  //Shortcut keys
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  //Auto Save (不是定期保存，不是定时器)
  useDebounceEffect(
    //和useEffect有同样的功能和写法 多一个参数添加wait 为防抖机制，防止多次更新
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      Save
    </Button>
  )
}

//Publish Button
const PublishButton: FC = () => {
  //publish ==> isPublished = true (update)
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const nav = useNavigate()

  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, //标志着问卷已经被发布
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success('Successfully Published')
        nav('/question/statistic/' + id) //发布成功 跳转到统计页面
      },
    }
  )

  return (
    <Button type="primary" onClick={publish} disabled={loading}>
      Publish
    </Button>
  )
}

//Edit page Header
const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              Back
            </Button>

            <Title>
              <TitleElem />
            </Title>
          </Space>
        </div>

        <div className={styles.main}>
          <EditToolBar />
        </div>

        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
