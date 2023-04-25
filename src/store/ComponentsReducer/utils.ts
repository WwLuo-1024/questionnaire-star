/*
方法getNextSelectedId用于选中删除组件后，选中状态自动变更（转移至下一个或者无组件可删除时消失）
The method getNextSelectedId is used to automatically change the selected state when a component is selected for deletion (moves to the next one or disappears when there are no components to delete)
*/

import { ComponentInfoType, ComponentStateType } from '.'

/**
 * Obtain selectedId
 * @param fe_id current id
 * @param componentList component list
 * @returns
 */

export function getNextSelectedId(fe_id: string, componentList: Array<ComponentInfoType>) {
  //过滤隐藏组件
  const visibleComponentList = componentList.filter(c => !c.isHidden)

  const index = componentList.findIndex(c => c.fe_id === fe_id)
  //如果删除空了 base case
  if (index < 0) return ''

  //recalulate
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    //the length of component is one, if deleted, then no more components
    newSelectedId = ''
  } else {
    // > 1
    //the length of component greater than one
    if (index + 1 === length) {
      //if delete last one, then should select last one(上一个)
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      //要删除的不是最后一个，删除以后选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

/**
 * Insert new Component
 * @param draft state draft
 * @param newComponent new Component
 */
export function inserNewComponent(draft: ComponentStateType, newComponent: ComponentInfoType) {
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
}
