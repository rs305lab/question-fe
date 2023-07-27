import React, { FC, useEffect, useRef, useState } from 'react'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { Typography, Empty, Spin } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../const'

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

  const [started, setStarted] = useState(false) //是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState(1)
  const [list, setList] = useState([]) // 全部的列表数据， 上划加载更多，累计
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams() // url 参数，虽然没有 page pageSize，但是有 keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  console.log(searchParams)

  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l)) // 累加
        setTotal(total)
        setPage(page + 1)
      },
    }
  )
  // 防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  useEffect(() => {
    tryLoadMore()
  }, [searchParams])
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const LoadMoreContentElem = () => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }

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
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer} ref={containerRef}>
        {LoadMoreContentElem()}
      </div>
    </>
  )
}

export default List
