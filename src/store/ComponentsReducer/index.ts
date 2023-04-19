import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import produce from 'immer'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
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

    // changeSelectedId: (state: ComponentStateType, action: PayloadAction<string>){

    // }
    changeSelectedId: produce((draft: ComponentStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload //state is still immutable, immer only change the way of writing useState.
    }),
  },
})

export const { resetComponents, changeSelectedId } = componentsSlice.actions

export default componentsSlice.reducer
