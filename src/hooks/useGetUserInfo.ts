/**
 * @description 从 store 中获取用户信息
 * @author rs305
 */

import { useSelector } from 'react-redux'
import { UserStateType } from '../store/user'
import { StateType } from '../store'

const useGetUserInfo = () => {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
  return { username, nickname }
}

export default useGetUserInfo
