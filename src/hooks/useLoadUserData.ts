import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'

import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)
  //ajax load userInfo
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
      //store data to redux store
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })
  const { username } = useGetUserInfo()

  //Determine whether user data already stored in redux store or not
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username])
  //No need to return user data and only need to pass it to redux
  return { waitingUserData }
}

export default useLoadUserData
