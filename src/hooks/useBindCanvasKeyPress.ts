import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/ComponentsReducer'

function isActiveElementValid() {
  const activeElem = document.activeElement

  //没有增加dnd-kit之前
  // if (activeElem === document.body) return true

  //增加dnd-kit以后
  if (activeElem === document.body) return true
  if (activeElem?.matches('div[role="button"]')) return true
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  //Delete Component
  useKeyPress(['backspace', 'delete'], () => {
    //判断光标位置 防止输出框中误删除组件
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  //Copy Component
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  //Paste Component
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  //Select the previous one
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  //Select the next one
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  //
}

export default useBindCanvasKeyPress
