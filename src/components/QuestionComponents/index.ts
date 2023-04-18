import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTiltePropsType } from './QuestionTitle'

//Unite) The props type of each component
export type ComponentPropsType = QuestionInputPropsType & QuestionTiltePropsType

//Unite) Component config
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//All components config list
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
