import React, { FC } from 'react'
import { Checkbox, Space, Typography } from 'antd'
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './interface'

const { Paragraph } = Typography

const Component: FC = (props: QuestionCheckboxPropsType) => {
  const { isVertical, title, list } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list?.map(l => {
          const { text, value, checked } = l
          return (
            <Checkbox checked={checked} key={value}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default Component
