import React, { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import 'antd/dist/reset.css'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'
// import '../_mock/index' //Mockjs needs to be commented out before going live
import axios from 'axios'
import { json } from 'stream/consumers'

const { Title, Paragraph } = Typography
export const Home: FC = () => {
  const nav = useNavigate()

  //Mockjs
  // useEffect(() => {
  // fetch('/api/test')
  //   .then(res => res.json())
  //   .then(data => console.log('fetch data', data))
  //fetch cyannot get mock.js

  // axios uses XMLHttpRequest internally
  //   axios.get('/api/test').then(res => console.log('axios data', res.data))
  // }, [])

  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => console.log('fetch data', data))
  }, [])

  function clickHandler() {
    nav('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>Questionnaire | Online Voting</Title>
        <Paragraph>
          A total of 100 have been created, 90 distribution questionnaires and 980 responses
          received
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            Start
          </Button>
        </div>
      </div>
    </div>
  )
}
