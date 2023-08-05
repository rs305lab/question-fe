import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
  selectedId: string
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
  // 待扩展
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // state 为不可变数据类型，但 toolkit 内置 immer 可直接更改 state
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      const { selectedId, componentList } = action.payload
      state.selectedId = selectedId
      state.componentList = componentList
    },
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload

      // 找到当前需要修改属性的组件
      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        }
      }
    },
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId: removeId } = state

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList)
      state.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id === removeId)
      componentList.splice(index, 1)
    },
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      insertNewComponent(state, action.payload)
    },
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList = [] } = state
      const { fe_id, isHidden } = action.payload

      let newSelectedId = ''
      // 不同 isHidden 显示或隐藏
      // 隐藏
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList)
      }
      // 显示
      else {
        newSelectedId = fe_id
      }
      state.selectedId = newSelectedId

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { componentList = [] } = state
      const { fe_id } = action.payload
      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) curComp.isLocked = !curComp.isLocked
    },
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent == null) return

      state.copiedComponent = cloneDeep(selectedComponent)
    },
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state
      if (copiedComponent) {
        const fe_id = nanoid()
        copiedComponent.fe_id = fe_id
        insertNewComponent(state, copiedComponent)
      }
    },
    selectPrevComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return
      if (selectedIndex <= 0) return

      state.selectedId = componentList[selectedIndex - 1].fe_id
    },
    selectNextComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return
      if (selectedIndex + 1 === componentList.length) return

      state.selectedId = componentList[selectedIndex + 1].fe_id
    },
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{
        fe_id: string
        title: string
      }>
    ) => {
      const { componentList } = state
      const { fe_id, title } = action.payload
      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) curComp.title = title
    },
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList: curComponentList } = state
      const { oldIndex, newIndex } = action.payload
      state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
    },
  },
})

export default componentsSlice.reducer
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions
