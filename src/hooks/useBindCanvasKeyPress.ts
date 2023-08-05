import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

/**
 * 判断是否 focus 到 input
 */
function isActiveElementValid() {
  const activeElem = document.activeElement

  // 光标没有 focus 到 input
  if (activeElem === document.body) return true
  if (activeElem?.matches('div[role="button"]')) return true

  return false
}

const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()

  useKeyPress(['delete', 'Backspace'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  useKeyPress(['ctrl.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  useKeyPress(['ctrl.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true, // 严格匹配
    }
  )

  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.redo())
    },
    {
      exactMatch: true, // 严格匹配
    }
  )
}

export default useBindCanvasKeyPress
