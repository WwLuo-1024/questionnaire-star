import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentReducer, { ComponentStateType } from './ComponentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StateType = {
  user: UserStateType
  components: ComponentStateType
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    //sub-modules
    user: userReducer,
    components: componentReducer,
    //component list

    //Page info
    pageInfo: pageInfoReducer,
  },
})
