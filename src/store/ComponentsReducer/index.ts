import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import cloneDeep from 'lodash.clonedeep'
import produce from 'immer'
import { getNextSelectedId } from './utils'
import { nanoid } from 'nanoid'
import { inserNewComponent } from './utils'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
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
      inserNewComponent(draft, newComponent)
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
          curComp.isHidden = isHidden
        }
      }
    ),

    //Lock, unLock Component
    toggleComponentLocked: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload

        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),

    //Copy current selected component
    copySelectedComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList = [] } = draft
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      console.log(componentList)
      if (selectedComponent == null) return
      draft.copiedComponent = cloneDeep(selectedComponent) //深拷贝
    }),

    //Paste Component
    pasteCopiedComponent: produce((draft: ComponentStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return

      //Need to modify fe_id!!!
      copiedComponent.fe_id = nanoid()

      //index copiedComponent
      inserNewComponent(draft, copiedComponent)
    }),

    //Select Previous one component
    selectPrevComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return //unselect

      if (selectedIndex <= 0) return //already selected first one, cannot select previous

      draft.selectedId = componentList[selectedIndex - 1].fe_id
    }),

    //Select next
    selectNextComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return //unselect component
      if (selectedIndex + 1 === componentList.length) return

      draft.selectedId = componentList[selectedIndex + 1].fe_id
    }),

    //Change component title
    changeComponentTitle: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { title, fe_id } = action.payload

        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) curComp.title = title
      }
    ),

    // MoveComponent
    moveComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComponentList } = draft
        const { oldIndex, newIndex } = action.payload
        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
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
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
