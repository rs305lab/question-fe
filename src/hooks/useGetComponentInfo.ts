/**
 * @description 从 store 中获取组件列表，由于多处使用所以封装抽离 hooks
 * @author rs305
 */

import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

const useGetComponentInfo = () => {
  const components = useSelector<StateType>(
    state => state.components.present
  ) as ComponentsStateType

  const { componentList = [], selectedId, copiedComponent } = components

  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent, copiedComponent }
}
export default useGetComponentInfo
