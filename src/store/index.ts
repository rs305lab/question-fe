import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import { UserStateType } from './user'

export type StateType = {
  user: UserStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    // 分模块扩展
  },
})
