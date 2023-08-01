export type QuestionTitlePropsType = {
  level?: 1 | 2 | 3 | 4 | 5
  text?: string
  isCenter?: boolean

  onChange?: (newProps: QuestionTitlePropsType) => void
  disabled?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  level: 1,
  text: '一行标题',
  isCenter: false,
}
