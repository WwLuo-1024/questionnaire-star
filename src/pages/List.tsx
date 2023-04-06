import React, { FC, useState } from 'react'
import styles from './List.module.scss'
import { QuestionCard } from '../components/QuestionCard'

export const List: FC = () => {
  return (
    <>
      <h1>List</h1>
      <QuestionCard />
    </>
  )
}
