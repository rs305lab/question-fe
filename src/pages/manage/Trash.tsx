import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
// import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { Typography, Empty, Tag, Table, Button, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

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

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '7月21日 09:21',
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
  {
    _id: 'q5',
    title: '问卷5',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '7月22日 9:37',
  },
]

const Trash: FC = () => {
  useTitle('小林问卷 - 回收站')

  const [questionList] = useState(rawQuestionList)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  function del() {
    confirm({
      cancelText: '取消',
      okText: '彻底删除',
      content: '确定删除吗，一旦删除不可恢复',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success(`${JSON.stringify(selectedIds)}删除成功`)
      },
    })
  }

  const TableElem = (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" disabled={selectedIds.length === 0}>
          恢复
        </Button>
        <Button disabled={selectedIds.length === 0} danger onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={questionList}
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
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Trash
