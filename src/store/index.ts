import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentReducer, { ComponentStateType } from './ComponentsReducer'

export type StateType = {
  user: UserStateType
  components: ComponentStateType
}

export default configureStore({
  reducer: {
    //sub-modules
    user: userReducer,
    components: componentReducer,
    //component list

    //questionnaire info
  },
})
