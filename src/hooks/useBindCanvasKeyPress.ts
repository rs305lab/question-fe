import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'

/**
 * 判断是否 focus 到 input
 */
function isActiveElementValid() {
  const activeElem = document.activeElement

  // 光标没有 focus 到 input
  if (activeElem === document.body) return true

  return false
}

const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()

  useKeyPress(['delete', 'Backspace'], () => {
    if (isActiveElementValid()) dispatch(removeSelectedComponent())
  })

  useKeyPress(['ctrl.c'], () => {
    if (isActiveElementValid()) dispatch(copySelectedComponent())
  })

  useKeyPress(['ctrl.v'], () => {
    if (isActiveElementValid()) dispatch(pasteCopiedComponent())
  })

  useKeyPress(['uparrow'], () => {
    if (isActiveElementValid()) dispatch(selectPrevComponent())
  })

  useKeyPress(['downarrow'], () => {
    if (isActiveElementValid()) dispatch(selectNextComponent())
  })

  //TODO 撤销重做
}

export default useBindCanvasKeyPress
