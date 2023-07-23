import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Home: FC = () => {
  const nav = useNavigate()
  return (
    <div>
      <div>home page</div>
      <button
        onClick={() => {
          nav(-1)
        }}
      >
        返回
      </button>
      <Link to="/manage/list">List</Link>
    </div>
  )
}

export default Home
