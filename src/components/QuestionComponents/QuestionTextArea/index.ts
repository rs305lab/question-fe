/**
 * @description 问卷输入框
 * @author rs305
 */

import Component from './Component'
import { QuestionTextAreaDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// 组件配置
export default {
  title: '输入框',
  type: 'questionTextArea',
  Component, //画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionTextAreaDefaultProps,
}
