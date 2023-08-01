import { ComponentInfoType, ComponentsStateType } from '.'

/**
 * 判断插入位置
 * @param fe_id 当前的组件选中的 id
 * @param componentList 组件列表
 * @returns 新的选中的 id
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  // 异常情况
  if (index < 0) return ''

  // 重新计算 selected
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    // 组件只有一个元素，删除就没有了，就没有组件
    newSelectedId = ''
  } else {
    // 组件长度 > 1
    if (index + 1 === length) {
      // 要删除最后一个，就要选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 要删除的不是最后一个，删除以后，选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

/**
 * 插入新组件
 * @param state
 * @param newComponent 新组建
 */
export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) {
    // 未选中任何组件
    state.componentList.push(newComponent)
  } else {
    // 选中组件，插入到 index 后面
    state.componentList.splice(index + 1, 0, newComponent)
  }

  state.selectedId = newComponent.fe_id
}
