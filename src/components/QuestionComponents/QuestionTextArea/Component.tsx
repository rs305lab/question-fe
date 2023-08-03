import { Typography, Input } from 'antd'
import React, { FC } from 'react'
import { QuestionTextAreaPropsType, QuestionTextAreaDefaultProps } from './interface'

const { Paragraph } = Typography
const { TextArea } = Input

const Component: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
  const { title, placeholder } = { ...QuestionTextAreaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default Component
