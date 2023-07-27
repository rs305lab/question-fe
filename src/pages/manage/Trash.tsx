import React, { FC, useState } from 'react'
import { useRequest, useTitle } from 'ahooks'
// import QuestionCard from '../../components/QuestionCard'
import ListPage from '../../components/ListPage'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { Typography, Empty, Tag, Table, Button, Space, Modal, message, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { deleteQuestionsService, updateQuestionService } from '../../services/question'

const { Title } = Typography
const { confirm } = Modal

const tableColumns = [
  {
    title: '标题',
    dataIndex: 'title',
    // key: 'title', //循环列的 key，会默认取 dataIndex 的值
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
    },
  },
  {
    title: '是否收藏',
    dataIndex: 'isStar',
    render: (isStar: boolean) => {
      return isStar ? <Tag color="processing">已标星</Tag> : <Tag>未标星</Tag>
    },
  },
  {
    title: '答卷',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
]

const Trash: FC = () => {
  useTitle('小林问卷 - 回收站')

  const { loading, data = {}, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total } = data

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  function del() {
    confirm({
      cancelText: '取消',
      okText: '彻底删除',
      content: '确定删除吗，一旦删除不可恢复',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteQuestions()
      },
    })
  }
  const { run: deleteQuestions, loading: deleteQuestionsLoading } = useRequest(
    async () => {
      const data = await deleteQuestionsService(selectedIds)
      return data
    },
    {
      manual: true,
      onSuccess: () => {
        message.success(`${JSON.stringify(selectedIds)}删除成功`)
        setSelectedIds([])
        refresh()
      },
    }
  )

  // 恢复
  const { run: recover, loading: recoverLoading } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      // debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功')
        setSelectedIds([])
        refresh() // 手动刷新列表
      },
    }
  )

  const TableElem = (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Button
          type="primary"
          disabled={selectedIds.length === 0 || deleteQuestionsLoading || recoverLoading}
          onClick={recover}
        >
          恢复
        </Button>
        <Button
          disabled={selectedIds.length === 0 || deleteQuestionsLoading || recoverLoading}
          danger
          onClick={del}
        >
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
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
        {!loading && list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
