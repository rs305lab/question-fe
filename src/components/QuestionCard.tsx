import React, { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '../services/question'

const { confirm } = Modal

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props
  const nav = useNavigate()

  // 标星
  const [isStarState, setIsState] = useState(isStar)
  const { run: changeStar, loading: changeStarLoading } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: isStarState })
    },
    {
      manual: true,
      onSuccess: () => {
        setIsState(!isStarState)
        message.success('已更新')
      },
    }
  )

  // function duplicate() {
  //   message.info('执行复制')
  // }
  const { run: duplicate, loading: duplicateLoading } = useRequest(
    async () => {
      return await duplicateQuestionService(_id)
    },
    {
      manual: true,
      onSuccess: result => {
        nav(`/question/edit/${result.id}`)
        message.success('已更新')
      },
    }
  )

  function del() {
    confirm({
      title: '是否删除该问卷',
      icon: <ExclamationCircleOutlined />,
      onOk: () => deletedQuestion(),
    })
  }
  const [isDeleted, setDeleted] = useState(false)
  const { run: deletedQuestion, loading: deletedLoading } = useRequest(
    async () => {
      await updateQuestionService(_id, { isDeleted: true })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('已删除')
        setDeleted(true)
      },
    }
  )
  if (isDeleted) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              icon={<LineChartOutlined />}
              size="small"
              disabled={isPublished}
              onClick={() => nav(`/question/stat/${_id}`)}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="是否复制该问卷"
              okText="复制"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
              disabled={deletedLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
