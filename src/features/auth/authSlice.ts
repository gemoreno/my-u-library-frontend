import type { RootState } from "@/store"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { User } from "./types"

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  error: string | null
  isLoading: boolean
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  error: null,
  isLoading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true
      state.error = null
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        user: User
      }>
    ) {
      state.isLoading = false
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
      state.error = null
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    logout(state) {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      state.error = null
      state.isLoading = false
    },
  },
})

export const selectIsLoggedIn = (state: RootState) => !!state.auth.accessToken
export const selectCurrentUser = (state: RootState) => state.auth.user

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

export default authSlice.reducer
