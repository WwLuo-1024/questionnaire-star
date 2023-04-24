import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import produce from 'immer'
import { getNextSelectedId } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHiddern?: boolean
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

    //Delete selected component
    removeSelectedComponent: produce((draft: ComponentStateType) => {
      const { componentList = [], selectedId: removeId } = draft

      //Recalculate selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList)
      draft.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id === removeId)
      componentList.splice(index, 1)
    }),

    //Hiddren - Display Component
    changeComponentHidden: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft
        const { fe_id, isHidden } = action.payload

        //recalculate selectedId(右侧属性面板需同步)
        let newSelectedId = ''
        if (isHidden) {
          //Need to hidden
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          //Need to display
          newSelectedId = fe_id
        }

        draft.selectedId = newSelectedId

        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHiddern = isHidden
        }
      }
    ),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
} = componentsSlice.actions

export default componentsSlice.reducer
