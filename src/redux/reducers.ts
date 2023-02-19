import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import todoReducer from './slice/todoSlice'

export default combineReducers({
  user: userReducer,
  todo: todoReducer
})
