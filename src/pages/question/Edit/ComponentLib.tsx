import React, { FC } from 'react'
import { ComponentConfType, componentConfGroup } from '../../../components/QuestionComponents'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { title, type, Component } = c
  return (
    <div className={styles.wrapper}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
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
            <div>
              {components.map(c => {
                console.log(c)
                return genComponent(c)
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}
export default ComponentLib
