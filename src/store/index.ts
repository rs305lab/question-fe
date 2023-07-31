import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import { UserStateType } from './user'
import ComponentsReducer from './componentsReducer'
import { ComponentsStateType } from './componentsReducer'

export type StateType = {
  user: UserStateType
  components: ComponentsStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: ComponentsReducer,
    // 分模块扩展
  },
})
