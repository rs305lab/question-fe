/**
 * @description 问卷多选框组件
 * @author rs305
 */

import Component from './Component'
import { QuestionCheckboxDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// 组件配置
export default {
  title: '单选框',
  type: 'questionCheckbox',
  Component, //画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionCheckboxDefaultProps,
}
