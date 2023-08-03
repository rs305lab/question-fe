import { Typography, Input } from 'antd'
import React, { FC } from 'react'
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface'

const { Paragraph } = Typography

const Component: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default Component
