import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

function useLoadQuestionListData() {
  const [searchParams] = useSearchParams()
  //   console.log('keyword', searchParams.get('keyword'))

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const data = await getQuestionListService({ keyword })
      return data
    },
    {
      refreshDeps: [searchParams], //Refreshing dependencies
    }
  )

  return { data, loading, error }
}

export default useLoadQuestionListData
