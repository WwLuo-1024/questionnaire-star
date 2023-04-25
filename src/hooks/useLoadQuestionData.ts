//useLoadQuestionData
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/ComponentsReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  //ajax loading
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('No questionnaire id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  //Accroding to obtained data to set redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data

    //Obtain default selectedId
    let selectedId = ''

    if (componentList.length > 0) {
      //.length > 0 means that there is at least one value in componentList
      selectedId = componentList[0].fe_id //Default selectedId is the first component
    }

    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
  }, [data])

  //determine id change, and execute ajax loading data
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
