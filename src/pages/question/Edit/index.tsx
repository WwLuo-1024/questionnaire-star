import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

export const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <div>
      <p>Edit Page</p>
      {loading ? <p>Loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}
