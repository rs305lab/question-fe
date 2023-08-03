/**
 * @description 问卷段落组件
 * @author rs305
 */

import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// 组件配置
export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
