import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import styles from './QuestionLayout.module.scss'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  // 加载用户信息
  const { waitingUserData } = useLoadUserData()
  // 用户没有登录时，跳转到登录页
  useNavPage(waitingUserData)

  return (
    <>
      <div style={{ height: '100vh' }}>
        {!waitingUserData ? (
          <Outlet />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        )}
      </div>
    </>
  )
}

export default QuestionLayout
