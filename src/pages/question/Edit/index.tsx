import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../../../services/question'

export const Edit: FC = () => {
  const { id = '' } = useParams()
  const [loading, setLoading] = useState(true)
  const [questionData, setQuestionData] = useState({})
  useEffect(() => {
    {
      /* useEffect中不能直接使用异步函数 */
    }
    async function fn() {
      const data = await getQuestionService(id)
      setQuestionData(data)
      setLoading(false)
    }
    fn()
  }, [])
  return (
    <div>
      <p>Edit Page</p>
      {loading ? <p>Loading</p> : <p>{JSON.stringify(questionData)}</p>}
    </div>
  )
}
