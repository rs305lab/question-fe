import React, { FC } from 'react'
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface'
import { Typography } from 'antd'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { level = 1, text = '', isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  const genFontSize = (level: number): string => {
    const fontSizeMap: { [key: number]: string } = {
      1: '24px',
      2: '20px',
      3: '16px',
    }
    return fontSizeMap[level] || '16px'
  }

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  )
}
export default QuestionTitle
