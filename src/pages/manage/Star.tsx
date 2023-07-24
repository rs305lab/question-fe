import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { Typography, Empty } from 'antd'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createdAt: '7月21日 09:21',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '7月21日 10:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createdAt: '7月21日 17:21',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '7月22日 9:21',
  },
]

const Star: FC = () => {
  useTitle('小林问卷 - 星标问卷')

  const [questionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(q => <QuestionCard key={q._id} {...q}></QuestionCard>)}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
