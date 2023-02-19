import { getUserInfo, login } from './../../api/login'
import {
  createSlice,
  // createAsyncThunk,
  type PayloadAction
} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { type AppDispatch } from '../store'
interface userState {
  accessToken: string
  userInfo: Record<string, any>
}

const initialState: userState = {
  accessToken: '',
  userInfo: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setToken: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload
    }
  }
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     userlogin.fulfilled,
  //     (state, action: PayloadAction<any>) => {
  //       state.accessToken = action.payload
  //     }
  //   )
  // }
})
// redux-persist config
const PersistConfig = {
  key: 'user', // storage key name
  storage, // localStorage
  whitelist: ['accessToken'] // state whitelist
}

// async action
export const userlogin = (user: any) => async (dispatch: AppDispatch) => {
  const { data } = await login(user)
  dispatch(userSlice.actions.setToken(data.access_token))
}
export const getInfo = () => async (dispatch: AppDispatch) => {
  const { data } = await getUserInfo()
  dispatch(userSlice.actions.setUserInfo(data))
}

export const { setToken, setUserInfo } = userSlice.actions

export default persistReducer(PersistConfig, userSlice.reducer)
