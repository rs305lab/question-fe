import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import { UserStateType } from './user'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoStateType } from './pageInfo'
import undoable, { StateWithHistory, excludeAction } from 'redux-undo'

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoStateType
}

export default configureStore({
  reducer: {
    user: userReducer,

    // 没有增加 undo
    // components: componentsReducer,

    // 增加 undo
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),

    pageInfo: pageInfoReducer,
    // 分模块扩展
  },
})
