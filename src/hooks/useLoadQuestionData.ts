//useLoadQuestionData
import React from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

function useLoadQuestionData() {
  const { id = '' } = useParams()

  {
    /* AJax */
  }
  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(id)
  //     setQuestionData(data)
  //     setLoading(false)
  //   }
  //   fn()
  // }, [])

  // return { loading, questionData }
  async function load() {
    // console.log(id)
    const data = await getQuestionService(id)
    return data
  }

  const { loading, data, error } = useRequest(load)
  return { loading, data, error }
}

export default useLoadQuestionData
