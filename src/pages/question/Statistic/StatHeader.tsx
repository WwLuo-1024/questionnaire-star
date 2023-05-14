import React, { FC, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { useNavigate } from 'react-router-dom'
import { Space, Button, Typography, Input, Tooltip, message, Popover } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useParams } from 'react-router-dom'
import type { InputRef } from 'antd'
import QRCode from 'qrcode.react'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()

  //Copy Link
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select() //selected content
    document.execCommand('copy') // Copy selected content
    message.success('Copy Success')
  }

  function genLinkAndQRCodeElem() {
    if (!isPublished) return null
    const url = `http://localhost:8000/question/${id}` //splice url, need to refer to C-cide rules

    //QRCODE
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="Copy Link">
          <Button icon={<CopyOutlined />} onClick={copy} />
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              Back
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            Edit Questionnaire
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
