/**
 * @description 问卷信息组件
 * @author rs305
 */

import Component from './Component'
import { QuestionInfoDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// 组件配置
export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}
