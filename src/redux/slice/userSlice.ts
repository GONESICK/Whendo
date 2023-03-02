import { getMenuList } from '@/api/user'
import { getUserInfo, login } from './../../api/login'
import {
  createSlice,
  // createAsyncThunk,
  type PayloadAction
} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { type AppDispatch } from '../store'
import { store } from '@/redux/store'
interface userState {
  accessToken: string
  userInfo: Record<string, any>
  menus: any[]
}

const initialState: userState = {
  accessToken: '',
  userInfo: {},
  menus: []
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
    },
    setMenus: (state, action: PayloadAction<any>) => {
      state.menus = action.payload
    }
  }
})
// redux-persist config
const PersistConfig = {
  key: 'user', // storage key name
  storage, // localStorage
  whitelist: ['accessToken', 'menus'] // state whitelist
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

// 递归验证角色菜单
const loopValidMenus = (menus: any[], role: any[]) => {
  const newMenus = menus.filter((f: any) => {
    if (f.children) {
      f.children = loopValidMenus(f.children, role)
    }
    return role.some((s: any) => f.role?.includes(s))
  })
  return newMenus
}

export const getMenus = () => async (dispatch: AppDispatch) => {
  const {
    data: { list }
  } = await getMenuList({})
  const { role } = store.getState().user.userInfo
  const filterMenus = loopValidMenus(list, role)
  dispatch(userSlice.actions.setMenus(filterMenus))
}

export const { setToken, setUserInfo, setMenus } = userSlice.actions

export default persistReducer(PersistConfig, userSlice.reducer)
