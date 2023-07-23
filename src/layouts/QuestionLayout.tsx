import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './QuestionLayout.module.scss'

const QuestionLayout: FC = () => {
  return (
    <>
      <div className={styles.header}>QuestionLayout</div>
      <Outlet />
    </>
  )
}

export default QuestionLayout
