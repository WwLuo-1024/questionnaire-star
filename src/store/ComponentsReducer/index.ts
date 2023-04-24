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

    //Add new component
    addComponent: produce((draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      const { selectedId, componentList } = draft
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      //Unselect any component
      if (index < 0) {
        draft.componentList.push(newComponent)
      } else {
        //selected component, then slice to postion behind index
        draft.componentList.splice(index + 1, 0, newComponent)
      }
      draft.selectedId = newComponent.fe_id
    }),

    //Modify Component property
    changeComponentProps: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        //如果当前组件id和传入组件id相同 意味着找到了当前需要修改的组件
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props, //解构当前组件props
            ...newProps, //覆盖
          }
        }
      }
    ),
  },
})

export const { resetComponents, changeSelectedId, addComponent, changeComponentProps } =
  componentsSlice.actions

export default componentsSlice.reducer
