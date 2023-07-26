import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()

  return (
    <>
      <p>Edit</p>
      <div>{loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}</div>
    </>
  )
}

export default Edit
