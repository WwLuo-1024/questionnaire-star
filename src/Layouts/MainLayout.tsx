import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import { Logo } from '../components/Logo'
import { UserInfo } from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const { Header, Content, Footer } = Layout

export const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      {/* To solve style priority issues for content */}
      <Layout>
        <Content className={styles.main}>
          {waitingUserData ? (
            <div style={{ textAlign: 'center', marginTop: 60 }}>
              <Spin size="large" />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        Online Questionnaire &copy;2023 - present. Created by WwLuo
      </Footer>
    </Layout>
  )
}
