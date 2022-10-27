import { createSlice } from '@reduxjs/toolkit'

const emptyUserState = {
  id: '',
  name: '',
  surname: '',
  username: '',
  token: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: emptyUserState,
  reducers: {
    createUser: (state, action) => action.payload,
    updateUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => emptyUserState
  }
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
