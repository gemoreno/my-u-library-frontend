import type { AppDispatch } from "@/store"
import { loginFailure, loginStart, loginSuccess } from "./authSlice"
import api from "@/lib/axios"
import { clearTokens, getRefreshToken, saveTokens } from "./authUtils"

export const loginUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(loginStart())

  try {
    const res = await api.post(`/token/`, { username, password })
    const accessToken = res.data.access
    const refreshToken = res.data.refresh

    saveTokens(accessToken, refreshToken)

    dispatch(loginSuccess({ accessToken, refreshToken }))
  } catch (err: any) {
    dispatch(loginFailure("Login failed. Please check your credentials."))
    throw err
  }
}


export const logoutUser = () => (dispatch: AppDispatch) => {
  clearTokens();
  dispatch(logoutUser());
};


export async function tryRefreshToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");

  try {
    const res = await api.post("/token/refresh/", {
      refresh,
    });

    const newAccess = res.data.access;
    saveTokens(newAccess, refresh);
    return newAccess;
  } catch (err) {
    clearTokens();
    throw err;
  }
}