import type { AppDispatch } from "@/store"
import { loginFailure, loginStart, loginSuccess } from "./authSlice"
import api from "@/lib/axios"

export const loginUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(loginStart())

  try {
    const res = await api.post(`/token/`, { username, password })
    const accessToken = res.data.access
    const refreshToken = res.data.refresh

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)

    dispatch(loginSuccess({ accessToken, refreshToken }))
  } catch (err: any) {
    dispatch(loginFailure("Login failed. Please check your credentials."))
    throw err
  }
}


export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  dispatch(logoutUser());
};