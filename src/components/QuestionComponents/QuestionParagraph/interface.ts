export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean

  // 属性表单使用
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false,
}
