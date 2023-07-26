import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData()

  return (
    <>
      <p>Stat</p>
      <div>{loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}</div>
    </>
  )
}

export default Stat
