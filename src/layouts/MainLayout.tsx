import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Content className={styles.main}>
        {!waitingUserData ? (
          <Outlet />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        )}
      </Content>
      <Footer className={styles.footer}>小林问卷 &copy;2023 - present. Created by lin</Footer>
    </Layout>
  )
}

export default MainLayout
