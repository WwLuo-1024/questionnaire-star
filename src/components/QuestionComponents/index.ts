import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

//Unite) The props type of each component
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

//Unite) Component config
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//All components config list
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

//Grouping of Components
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: 'Text Display',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: 'User Input',
    components: [QuestionInputConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
