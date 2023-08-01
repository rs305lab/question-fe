import React, { FC } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolBar'

const { Title } = Typography

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" onClick={() => nav(-1)} icon={<LeftOutlined />}>
              返回
            </Button>
            <Title>问卷标题占位</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Button>保存</Button>
          <Button type="primary">发布</Button>
        </div>
      </div>
    </div>
  )
}

export default EditHeader