import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

export const Edit: FC = () => {
  const { id = '' } = useParams()
  return (
    <>
      <h1>Edit {id}</h1>
    </>
  )
}
