/**
 * @description 判断用户是否登录返回 waitingUserData 状态
 * @author rs305
 */

import { useEffect, useState } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/user'

const useLoadUserData = () => {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const dispatch = useDispatch()

  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname })) // 存储到 redux store 中
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // 判断当前的 redux store 是否已存在用户信息
  const { username } = useGetUserInfo() // 从 redux store 中拿到
  useEffect(() => {
    // 如果 redux store 已存在用户信息，则不需要重新加载
    if (username) {
      setWaitingUserData(false)
      return
    }

    // 否则加载
    run()
  }, [])

  return { waitingUserData }
}

export default useLoadUserData
