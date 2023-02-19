import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface todoState {
  totod: string
}
const initialState: todoState = {
  totod: ''
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<string>) => {
      state.totod = action.payload
    }
  }
})

export const { setTodo } = todoSlice.actions
export default todoSlice.reducer
