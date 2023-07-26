import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { Typography, Empty, Spin } from 'antd'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

// type QuestionListType = [
//   {
//     _id?: string
//     title?: string
//     isPublished?: boolean
//     isStar?: boolean
//     answerCount?: number
//     createdAt?: string
//     isDeleted?: boolean
//   },
// ]
const { Title } = Typography

const List: FC = () => {
  useTitle('小林问卷 - 我的问卷')

  const { loading, data = {} } = useLoadQuestionListData()
  const { list = [], total } = data
  // const [questionList, setQuestionList] = useState([{}])
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService()
  //     const { list, total } = data || {}
  //     setQuestionList(list)
  //     setLoading(false)
  //   }
  //   load()
  // }, [])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>loadMore 上划加载更多</div>
    </>
  )
}

export default List
