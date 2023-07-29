import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import styles from './QuestionLayout.module.scss'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <>
      <div className={styles.header}>QuestionLayout</div>
      {!waitingUserData ? (
        <Outlet />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin />
        </div>
      )}
    </>
  )
}

export default QuestionLayout
