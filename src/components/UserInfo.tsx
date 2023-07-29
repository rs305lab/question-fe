import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '../router/router'
// import { useRequest } from 'ahooks'
// import { getUserInfoService } from '../services/user'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/user'

const UserInfo: FC = () => {
  const nav = useNavigate()

  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}
  // 使用状态管理获取登录信息，减少发送请求次数
  const { username, nickname } = useGetUserInfo()
  const dispatch = useDispatch()

  function logout() {
    dispatch(logoutReducer)
    removeToken()
    message.success('登出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
