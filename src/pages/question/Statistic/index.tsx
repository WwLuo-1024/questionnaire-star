import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

export const Statistic: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <div>
      <p>Statistic Page</p>
      {loading ? <p>Loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}
