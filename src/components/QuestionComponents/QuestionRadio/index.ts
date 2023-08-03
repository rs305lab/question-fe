/**
 * @description 问卷单选框
 * @author rs305
 */

import Component from './Component'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// 组件配置
export default {
  title: '单选框',
  type: 'questionRadio',
  Component, //画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionRadioDefaultProps,
}
