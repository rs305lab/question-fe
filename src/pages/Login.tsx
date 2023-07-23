import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: FC = () => {
  const nav = useNavigate()

  const clickHandler = () => {
    nav({
      pathname: '/',
      search: 'id=1',
    })
  }

  return (
    <>
      <div>Login</div>
      <button onClick={clickHandler}>login</button>
    </>
  )
}

export default Login
