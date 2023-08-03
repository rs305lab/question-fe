import React, { FC } from 'react'
import { ComponentConfType, componentConfGroup } from '../../../components/QuestionComponents'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'

const { Title } = Typography

const ComponentLib: FC = () => {
  const dispatch = useDispatch()

  function genComponent(c: ComponentConfType) {
    const { title, type, Component, defaultProps } = c
    const handleClick = () => {
      dispatch(
        addComponent({
          fe_id: nanoid(), // 前端生成的 id
          title,
          type,
          props: defaultProps,
        })
      )
    }
    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    )
  }

  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '16px' : '' }}>
              {groupName}
            </Title>
            {/* 缺少 key，为什么需要循环 */}
            <div>{components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}
export default ComponentLib
