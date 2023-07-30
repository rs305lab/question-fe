import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'

import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'

// 静态测试
const EditCanvas: FC = () => {
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  )
}
export default EditCanvas
