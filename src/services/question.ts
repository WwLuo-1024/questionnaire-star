import axios, { ResDataType } from './ajax'
type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  //page
  //pageSize
  //isStar
  //isDeleted
  //isPublished
  //...
}

//Get signle questionnaire info
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}

//Create Questionnaire
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}

// Obtain(Query) questionnaire list
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}
