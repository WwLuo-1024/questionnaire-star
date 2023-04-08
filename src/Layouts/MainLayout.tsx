import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout

export const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>Logo</div>
        <div className={styles.right}>Login</div>
      </Header>
      {/* To solve style priority issues for content */}
      <Layout>
        <Content className={styles.main}>
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        Online Questionnaire &copy;2023 - present. Created by WwLuo
      </Footer>
    </Layout>
  )
}
