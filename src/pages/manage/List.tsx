import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '7月21日 9:21',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '7月21日 10:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '7月21日 17:21',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '7月22日 9:21',
  },
  {
    _id: 'q5',
    title: '问卷5',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '7月22日 9:37',
  },
]

const List: FC = () => {
  const [questionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {questionList.map(q => (
          <QuestionCard key={q._id} {...q}></QuestionCard>
        ))}
      </div>
      <div className={styles.footer}>list page footer</div>
    </>
  )
}

export default List
