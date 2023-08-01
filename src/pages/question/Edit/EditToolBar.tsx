import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  BlockOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  copySelectedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
  pasteCopiedComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }
  function handleCopy() {
    dispatch(copySelectedComponent())
  }
  function handlePaste() {
    dispatch(pasteCopiedComponent())
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent == null}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
