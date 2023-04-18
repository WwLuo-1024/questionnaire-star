import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentStateType = {
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentStateType = {
  componentList: [],
  //other expands
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //reset
    resetComponents(states: ComponentStateType, action: PayloadAction<ComponentStateType>) {
      return action.payload
    },
  },
})

export const { resetComponents } = componentsSlice.actions

export default componentsSlice.reducer
