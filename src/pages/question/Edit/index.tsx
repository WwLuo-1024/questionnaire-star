import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

export const Edit: FC = () => {
  const { loading, questionData } = useLoadQuestionData()
  return (
    <div>
      <p>Edit Page</p>
      {loading ? <p>Loading</p> : <p>{JSON.stringify(questionData)}</p>}
    </div>
  )
}
