/**
 * @description 路由守卫
 * @author rs305
 */

import { useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNeedUserInfo,
} from '../router/router'
import { useLocation, useNavigate } from 'react-router-dom'

const useNavPage = (waitingUserData: boolean) => {
  const { username } = useGetUserInfo()
  const nav = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (waitingUserData) return

    // 已登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    // 未登录
    if (isNeedUserInfo(pathname)) {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])

  return
}

export default useNavPage
